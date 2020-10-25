import { RequestCreateUser, ResponseUser, RequestUpdateUser } from './user.dto';
import { UserEntity } from './../../typeorm/entity/user.entity';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUser: RequestCreateUser) {
    return this.userService.create(createUser);
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('all-info')
  findNameList(): Promise<ResponseUser[]> {
    return this.userService.findUserInfo();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<UserEntity> {
    return this.userService.findOne(email);
  }

  @Get('page/:skip')
  findPage(@Param('skip') skip: number) {
    return this.userService.find(+skip);
  }

  @Get('search/:name')
  findName(@Param('name') name: string) {
    return this.userService.find(name);
  }

  @Patch('')
  updateName(@Body() updateUser: RequestUpdateUser) {
    return this.userService.updateNameSample1(updateUser);
  }

  @Patch('pass')
  updateNameAuthPassword(@Body() updateUser: RequestUpdateUser) {
    return this.userService.updateNameSample2(updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
