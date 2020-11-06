import { AppConfigService } from './../service/app-config/app-config.service';
import { UserService } from './../endpoint/user/user.service';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { AppLogger } from 'src/util/app-logger';
import { User } from '../endpoint/user/user.dto';
import * as bcrypt from 'bcrypt';

export type Encrypt = {
  encrypted: string,
  iv: string
};

export type JWToken = {
  id: number;
  name: string;
  email: string;
};

@Injectable()
export class AuthService {
  readonly logger = new AppLogger(AuthService.name);
  readonly aes_256_key = this.appConfigService.get('AES_256_KEY');
  constructor(private userService: UserService, private readonly appConfigService: AppConfigService) {
  }

  async validateUser(email: string, pass: string): Promise<JWToken> {
    const user = await this.userService.auth(email, pass);
    if (user && user.password === pass) {
      return { id: user.id, name: user.name, email: user.email };
    }
    return null;
  }

  /**
   * ログイン認証
   * @param email 
   * @param password 
   */
  async login(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }

  }

  encryption(data: string, iv?: string): Encrypt {
    data = Buffer.from(data).toString('base64');
    if (!iv) {
      iv = crypto.randomBytes(8).toString('hex');
    }
    const cipher = crypto.createCipheriv('aes-256-cbc', this.aes_256_key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encrypted: encrypted,
      iv: iv,
    };
  }

  decryption(data: string, iv: string): string {
    let plaintext: string;
    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.aes_256_key, iv);
      plaintext = decipher.update(data, 'hex', 'utf8');
      plaintext += decipher.final('utf8');
      plaintext = Buffer.from(plaintext, 'base64').toString('utf8');
    } catch (error) {
      this.logger.error(error);
      return null;
    }
    return plaintext;
  }
}

