import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * 環境変数一覧.
 * 
 * .envファイルのKeyを定義すること。
 */
type Config = {
  DOMAIN: string;
  MONGODB_URL: string;
  SERVER_PORT: number;
  BCRYPT_SALT_ROUNDS: number;
  JWT_SECRET_KEY: string;
};

/**
 * Config型コンパニオンオブジェクトパターン.
 */
const Config = {
  from(DOMAIN, MONGODB_URL, SERVER_PORT, BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY): Config {
    return { DOMAIN, MONGODB_URL, SERVER_PORT, BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY };
  }
};

/**
 * 環境変数管理サービス.
 * 
 * .envファイルを読み込み/保存/取得機能を提供する。
 */
@Injectable()
export class AppConfigService  {
  config: Config;  // 環境変数保存変数
  constructor(private configService: ConfigService) {
    this.settingConfig();
  }

  /**
   * 環境変数ファイルを読み込む。
   */
  private settingConfig() {
    const domain = this.loadEnvFile<string>('DOMAIN');
    const mongodb = this.loadEnvFile<string>('MONGODB_URL');
    const server_port = this.loadEnvFile<number>('SERVER_PORT');
    const bcrypt_salt_rounds = this.loadEnvFile<number>('BCRYPT_SALT_ROUNDS');
    const jwt_key = this.loadEnvFile<string>('JWT_SECRET_KEY');
    this.config = Config.from(domain, mongodb, server_port, bcrypt_salt_rounds, jwt_key);
  }

  /**
   * .envファイルから環境変数の値を取得する.
   * 
   * @param key .envファイルのKey
   */
  private loadEnvFile<T = any>(key: keyof Config): T {
    const val = this.configService.get<T>(key);
    if (val) {
      return val;
    }
    throw new Error(`.env File Failed. Configuration file syntax error : Key = "${key}"`);
  }

  /**
   * 環境変数の値を取得する
   * 
   * @param key .envファイルのKey
   */
  public get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

}
