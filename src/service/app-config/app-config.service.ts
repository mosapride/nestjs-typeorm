import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from 'src/util/app-logger';

/**
 * 環境変数一覧.
 * 
 * .envファイルのKeyを定義すること。
 */
type Config = {
  LEVEL: string;
  DOMAIN: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USERNAME: string,
  MYSQL_PASSWORD: string,
  MYSQL_DATABASE: string,
  SERVER_PORT: number;
  BCRYPT_SALT_ROUNDS: number;
  JWT_SECRET_KEY: string;
  AES_256_KEY: string;
};

/**
 * Config型コンパニオンオブジェクトパターン.
 */
const Config = {
  from(LEVEL, DOMAIN, MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, SERVER_PORT, BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY, AES_256_KEY): Config {
    return { LEVEL, DOMAIN, MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, SERVER_PORT, BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY, AES_256_KEY };
  }
};

/**
 * 環境変数管理サービス.
 * 
 * .envファイルを読み込み/保存/取得機能を提供する。
 */
@Injectable()
export class AppConfigService {
  readonly logger = new AppLogger(AppConfigService.name);
  config: Config;  // 環境変数保存変数
  constructor(private configService: ConfigService) {
    this.settingConfig();
  }

  /**
   * 環境変数ファイルを読み込む。
   */
  private settingConfig() {
    const level = process.env.LEVEL;
    const domain = this.loadEnvFile<string>('DOMAIN');
    const mysqlHost = this.loadEnvFile<string>('MYSQL_HOST');
    const mysqlPort = +this.loadEnvFile<number>('MYSQL_PORT');
    const mysqlUsername = this.loadEnvFile<string>('MYSQL_USERNAME');
    const mysqlPassword = this.loadEnvFile<string>('MYSQL_PASSWORD');
    const mysqlDatabase = this.loadEnvFile<string>('MYSQL_DATABASE');

    const server_port = +this.loadEnvFile<number>('SERVER_PORT');
    const bcrypt_salt_rounds = +this.loadEnvFile<number>('BCRYPT_SALT_ROUNDS');
    const jwt_key = this.loadEnvFile<string>('JWT_SECRET_KEY');
    const aes_256_key = this.loadEnvFile<string>('AES_256_KEY');
    this.config = Config.from(level, domain, mysqlHost, mysqlPort, mysqlUsername, mysqlPassword, mysqlDatabase, server_port, bcrypt_salt_rounds, jwt_key, aes_256_key);
  }


  public isDebug(): boolean {
    if (this.config.LEVEL === 'debug') {
      return true;
    }
    return false;
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
