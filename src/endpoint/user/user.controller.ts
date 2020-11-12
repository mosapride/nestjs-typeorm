import { UserEntity } from './../../typeorm/entity/user.entity';
import { RequestCreateUser, ResponseUser, RequestUpdateUser, User } from './user.dto';
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
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('all-info')
  findNameList(): Promise<ResponseUser[]> {
    return this.userService.findUserInfo();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
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
