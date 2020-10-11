import { AppLogger } from './util/app-logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new AppLogger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }
}
