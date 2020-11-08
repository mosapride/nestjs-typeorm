import { AppConfigModule } from './../service/app-config/app-config.module';
import { UserModule } from './../endpoint/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    AppConfigModule
  ],
  exports: [LocalAuthGuard ,LocalStrategy, AuthService, JwtStrategy],
  providers: [LocalAuthGuard ,LocalStrategy, AuthService, JwtStrategy]
})
export class AuthModule { }
