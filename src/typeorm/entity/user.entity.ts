import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../endpoint/user/user.dto';


@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  debug: boolean;
  
}
