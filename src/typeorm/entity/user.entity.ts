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
  plainPassword: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  debug: boolean;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  registered : Date;

}
