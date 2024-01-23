import { convertToSecondsUtil } from '@common/utils/convert-to-seconds.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role, User } from '@prisma/client';
import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';
import { JwtPayload } from 'src/auth/auth.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async save(user: Partial<User>) {
    const hashedPassword = user?.password
      ? this.hashPassword(user.password)
      : null;

    const savedUser = await this.prismaService.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        password: hashedPassword ?? undefined,
        provider: user?.provider ?? undefined,
        roles: user?.roles ?? undefined,
        isBlocked: user?.isBlocked ?? undefined,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        roles: ['USER'],
        provider: user?.provider,
      },
    });

    await this.cacheManager.set(savedUser.id, savedUser);
    await this.cacheManager.set(savedUser.email, savedUser);

    return savedUser;
  }

  async findOne(idOrEmail: string, isReset = false): Promise<User> {
    if (isReset) {
      await this.cacheManager.del(idOrEmail);
    }

    const user = await this.cacheManager.get<User>(idOrEmail);

    if (!user) {
      console.log('findOne');

      const cachedUser = await this.prismaService.user.findFirst({
        where: { OR: [{ id: idOrEmail }, { email: idOrEmail }] },
      });
      if (!cachedUser) {
        return null;
      }
      await this.cacheManager.set(
        idOrEmail,
        cachedUser,
        convertToSecondsUtil(this.configService.get('JWR_EXP')),
      );
      return cachedUser;
    }

    return user;
  }

  findAll() {}

  async delete(id: string, user: JwtPayload) {
    if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException();
    }

    await Promise.all([
      this.cacheManager.del(id),
      this.cacheManager.del(user.email),
    ]);

    return this.prismaService.user.delete({
      where: { id },
      select: { id: true },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
