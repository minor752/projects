import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [CacheModule.register()],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
