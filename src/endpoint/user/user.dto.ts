import { UserEntity } from './../../typeorm/entity/user.entity';

export type CreateUser = Omit<UserEntity, 'id' | 'isActive'>;

