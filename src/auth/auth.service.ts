import { AuthJwtHash, EncryptionAuthJwtHash } from './../endpoint/user/user.dto';
import { AppConfigService } from './../service/app-config/app-config.service';
import { UserService } from './../endpoint/user/user.service';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { AppLogger } from '../util/app-logger';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

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
  readonly jwtOption: JwtSignOptions = {
    secret: this.appConfigService.get('JWT_SECRET_KEY'),
    expiresIn: '7 days'
  };
  constructor(
    private readonly userService: UserService,
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService) {
  }

  async validateUser(email: string, pass: string): Promise<JWToken> {
    const user = await this.userService.auth(email, pass);
    if (user && user.password === pass) {
      return { id: user.id, name: user.name, email: user.email };
    }
    return null;
  }

  /**
   * アクセストークン作成
   * 
   * @param email email
   * @param password password
   * @returns 認証成功時：JWTokenを返す。認証失敗時(ログイン認証失敗)：null
   */
  async createAccessToken(email: string, password: string): Promise<string> {
    const user = await this.userService.findOne(email);
    if (bcrypt.compareSync(password, user.password)) {
      const encryptionAuthJwtHash = this.encryptionAuthJwtHash(user.email, user.modified);
      return this.jwtService.signAsync(encryptionAuthJwtHash, this.jwtOption);
    } else {
      return null;
    }
  }

  /**
   * email、modifiedを暗号化したJwtを返す。
   * 
   * @param email email
   * @param modified 更新日
   */
  encryptionAuthJwtHash(email: string, modified: Date): EncryptionAuthJwtHash {
    const e = this.encryption(email);
    const m = this.encryption(modified, e.iv);
    const encryptionAuthJwtHash: EncryptionAuthJwtHash = {
      email: e.encrypted,
      modified: m.encrypted,
      iv: e.iv
    };
    return encryptionAuthJwtHash;
  }

  /**
   * 暗号化したemail、modifiedを暗号化したJwtを復号化する。
   * @param hash 複合化したemail,modified
   */
  decryptionAuthJwtHash(hash: EncryptionAuthJwtHash): AuthJwtHash {
    const email = this.decryption(hash.email, hash.iv);
    const modi = this.decryption(hash.modified, hash.iv);
    const modified = new Date(+modi);
    const authJwtHash: AuthJwtHash = {
      email, modified
    };
    return authJwtHash;
  }

  encryption(data: string | number | Date, iv?: string): Encrypt {
    if (typeof data === 'number') {
      data = data + '';
    }
    if (data instanceof Date) {
      data = data.getTime() + '';
    }
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

