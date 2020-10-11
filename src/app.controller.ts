import { AppLogger } from './util/app-logger';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  readonly logger = new AppLogger(AppController.name);
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    this.logger.log('logテスト');
    this.logger.debug('debugテスト');
    this.logger.error('errorテスト');
    this.logger.warn('warnテスト');
    this.logger.verbose('verboseテスト');
    return this.appService.getHello();
  }
}
