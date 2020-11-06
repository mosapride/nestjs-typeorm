import { AppConfigModule } from './../service/app-config/app-config.module';
import { UserModule } from './../endpoint/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '7 days' } }),
    UserModule,
    AppConfigModule
  ],
  exports: [LocalStrategy, AuthService],
  providers: [LocalStrategy, AuthService]
})
export class AuthModule { }
