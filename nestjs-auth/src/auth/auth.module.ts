import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { options } from './config/jwt-module-async-options';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleGuard } from './guards/google.guard';
import { HttpModule } from '@nestjs/axios';
import { YandexStrategy } from './strategies/yandex.strategy';
import { YandexGuard } from './guards/yandex.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    YandexStrategy,
    JwtAuthGuard,
    RolesGuard,
    GoogleGuard,
    YandexGuard
  ],
})
export class AuthModule {}
