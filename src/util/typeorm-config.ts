import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadDotEnv} from './env-file';

const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  loadDotEnv();

  const option: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    useUnifiedTopology: true,
    entities: ['src/typeorm/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/typeorm/migrations/**/*{.ts,.js}'],
    subscribers: ['src/typeorm/subscribers/**/*.{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: false,
    logging: true,
    cli: {
      entitiesDir: 'src/typeorm/entities',
      migrationsDir: 'src/typeorm/migrations',
      subscribersDir: 'src/typeorm/subscribers'
    },
  };

  return option;
};

module.exports = getTypeOrmModuleOptions();
