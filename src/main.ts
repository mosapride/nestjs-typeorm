import { AppLogger } from './util/app-logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './service/app-config/app-config.service';
import { loadDotEnv } from './util/env-file';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  loadDotEnv();
  const loggerLevel = process.env.LOG_LEVEL.split(',') as LogLevel[];
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel,
  });
  const apiConfigService = app.get(AppConfigService);
  await app.listen(apiConfigService.get('SERVER_PORT') || 3000);
  const logger = new AppLogger('bootstrap');
  logger.log(`Listen Port : ${await app.getUrl()}`);
}
bootstrap();
