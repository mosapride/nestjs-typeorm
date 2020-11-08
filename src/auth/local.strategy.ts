import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

export type Token = {
  access_token: string;
  JwtService
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    /*
     * 受けつるパラメータ名を変更・明示する。
     *
     * ```json:body
     *  {
     *    email : string,
     *    password : string
     *  }
     */
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  /**
   * 
   * 
   * @param email 
   * @param password 
   */
  async validate(email: string, password: string): Promise<string> {
    const token = await this.authService.createAccessToken(email, password);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}