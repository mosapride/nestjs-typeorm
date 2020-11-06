import { AppLogger } from './util/app-logger';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

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

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return req.user;
  }
}
