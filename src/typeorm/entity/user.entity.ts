import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User, UserRole } from '../../endpoint/user/user.dto';


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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ACTIVE })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)' })
  readonly registered: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)', onUpdate: 'CURRENT_TIMESTAMP(0)' })
  readonly modified: Date;

}
