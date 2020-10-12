import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './service/app-config/app-config.service';
import { UserModule } from './user/user.module';
import { TypeOrmConfig } from './service/app-config/typeorm-config.service';
import { getEnvFileName } from './util/env-file';

const envFile = getEnvFileName();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFile],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService, TypeOrmConfig],
})
export class AppModule { }
