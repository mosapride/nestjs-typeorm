import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../typeorm/entity/user.entity';
import { AppConfigModule } from '../../service/app-config/app-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AppConfigModule
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
