import { AppConfigService } from './../service/app-config/app-config.service';
import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

export type Token = {
  access_token: string;
  JwtService
};

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, appConfigService: AppConfigService) {
    super({
      cookieName: appConfigService.get('COOKIE_ACCESS_NAME')
    });
  }

  async validate(req, token) {
    console.log(`CookieStrategy - validate`);

    console.log({ req, token });
    console.log(token);
  }
}