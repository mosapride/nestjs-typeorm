import { AppLogger } from './util/app-logger';
import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService as AppConfigService } from './service/app-config/app-config.service';

async function bootstrap() {
  const loggerLevel: boolean | LogLevel[] = (process.env.LEVEL && process.env.LEVEL === 'RELEASE') ? ['error', 'warn'] : ['log', 'error', 'warn', 'debug', 'verbose'];
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel,
  });
  const apiConfigService = app.get(AppConfigService);
  await app.listen(apiConfigService.get('SERVER_PORT') || 3000);
  const logger = new AppLogger('bootstrap');
  logger.log(`Listen Port : ${await app.getUrl()}`);
}
bootstrap();
