import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppLogger } from './util/app-logger';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import express from 'express';
import { AppConfigService } from './service/app-config/app-config.service';

@Controller()
export class AppController {
  readonly cookieName = this.appConfigService.get('COOKIE_ACCESS_NAME');
  readonly cookieMaxAge = this.appConfigService.get('COOKIE_MAX_AGE');
  readonly httpOnly = this.appConfigService.get('LEVEL') === 'debug' ? false : true;
  readonly logger = new AppLogger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly appConfigService: AppConfigService,
  ) { }

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
  async login(@Req() req, @Res() res: express.Response) {
    console.log(req.user);
    res.cookie(this.cookieName, req.user, {
      maxAge: this.cookieMaxAge, httpOnly: this.httpOnly,
    });
    res.sendStatus(201);
  }


  // @UseGuards(AuthGuard('local'))
  @UseGuards(JwtAuthGuard)
  @Get('cookie-test')
  async test(@Req() req: express.Request) {
    console.log(req['user']);
    return 'hello';
  }
}
