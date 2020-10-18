import { CreateUser } from './user.dto';
import { UserEntity } from '../../typeorm/entity/user.entity';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  create(createUser: CreateUser) {
    // const user = Object.assign(new UserEntity(), createUser) ;
    const user: UserEntity = { ...new UserEntity(), ...createUser };
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

}