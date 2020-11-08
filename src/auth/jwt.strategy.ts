import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '../service/app-config/app-config.service';
import { Request } from 'express';
import { EncryptionAuthJwtHash } from '../endpoint/user/user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly appConfigService: AppConfigService,
    readonly  authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies[appConfigService.get('COOKIE_ACCESS_NAME')];
      }]),
      ignoreExpiration: false,
      secretOrKey: appConfigService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: EncryptionAuthJwtHash) {
    console.log(payload);
    const authJwtHash = this.authService.decryptionAuthJwtHash(payload);
    const check = await this.authService.checkAuthExpired(authJwtHash.email , authJwtHash.modified);
    if (!check) {
      throw new UnauthorizedException();
    }
    return authJwtHash;
  }
}