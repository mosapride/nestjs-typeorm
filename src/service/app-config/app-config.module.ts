import { AppConfigService } from './../../service/app-config/app-config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFileName } from '../../util/env-file';

const envFile = getEnvFileName();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFile],
    }),
  ],
  exports: [AppConfigService],
  providers: [AppConfigService]
})
export class AppConfigModule { }
