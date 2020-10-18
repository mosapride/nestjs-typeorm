import { CreateUser } from './user.dto';
import { UserEntity } from './../../typeorm/entity/user.entity';
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUser : CreateUser) {
    return this.userService.create(createUser);
  }


  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id :string) {
    return this.userService.remove(id);
  }
}