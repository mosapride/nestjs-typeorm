import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadDotEnv } from './env-file';
import { join } from 'path';

const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  loadDotEnv();
  const option: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', '/**/migrations/**/*{.ts,.js}')],
    subscribers: [join(__dirname, '..', '/**/*.subscribe{.ts,.js}')],
    synchronize: (process.env.TYPEORM_LOGGING && process.env.TYPEORM_LOGGING === 'true') ? true : false,
    logging: (process.env.TYPEORM_SYNCHRONIZE && process.env.TYPEORM_SYNCHRONIZE === 'true') ? true : false,
    cli: {
      entitiesDir: 'src',
      migrationsDir: 'src/typeorm/migrations',
    },
  };
  return option;
};

module.exports = getTypeOrmModuleOptions();
