import { AppConfigModule } from './service/app-config/app-config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './service/app-config/typeorm-config.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './endpoint/user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig
    }),
    PassportModule,
    UserModule,
    // AppConfigModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfig],
})
export class AppModule { }
