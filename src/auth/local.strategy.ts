import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../endpoint/user/user.dto';

export type Token = {
  access_token: string;
  JwtService 
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}