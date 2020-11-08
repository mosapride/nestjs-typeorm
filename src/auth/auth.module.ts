import { AppConfigModule } from './../service/app-config/app-config.module';
import { UserModule } from './../endpoint/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { CookieStrategy } from './cookie.strategy';
import { CookieAuthGuard } from './cookie-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    AppConfigModule
  ],
  exports: [AuthService, LocalAuthGuard, LocalStrategy, CookieAuthGuard, CookieStrategy, JwtAuthGuard, JwtStrategy],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, CookieAuthGuard, CookieStrategy, JwtAuthGuard, JwtStrategy],
})
export class AuthModule { }
