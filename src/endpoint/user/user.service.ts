import { RequestCreateUser, ResponseUser, RequestUpdateUser, User } from './user.dto';
import { UserEntity } from '../../typeorm/entity/user.entity';
import { Injectable } from "@nestjs/common";
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '../../service/app-config/app-config.service';

@Injectable()
export class UserService {
  readonly BCRYPT_SALT_ROUNDS: number = this.appConfigService.get('BCRYPT_SALT_ROUNDS');
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly appConfigService: AppConfigService) { }

  /**
   * 新しいユーザー情報を作成する
   * 
   * @param createUser ユーザー情報
   */
  create(createUser: RequestCreateUser) {
    const user: UserEntity = { ...new UserEntity(), ...createUser };
    if (this.appConfigService.isDebug()) {
      user.plainPassword = createUser.password;
    }
    const salt = bcrypt.genSaltSync(this.BCRYPT_SALT_ROUNDS);
    user.password = bcrypt.hashSync(user.password, salt);
    return this.userRepository.save(user);
  }

  /**
   * 全てのユーザー情報を返す
   */
  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findUserInfo(): Promise<ResponseUser[]> {
    return this.userRepository.find({
      select: ["name", "email"]
    }) as Promise<ResponseUser[]>;
  }

  /**
   * email、パスワードの一致するユーザー情報を返す。
   * @param email email
   * @param password 平文パスワード
   */
  async auth(email: string, password: string): Promise<User> {
    return await this.findOne(email).then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user as User;
      } else {
        return null;
      }
    });
  }

  /**
   * emailに一致したユーザー情報を返す
   * 
   * @param email email(unique key)
   */
  findOne(email: string, modified?: Date): Promise<User> {
    const option: FindOneOptions<User> = {};
    if (modified) {
      option.where = { email, modified };
    } else {
      option.where = { email };
    }
    return this.userRepository.findOne(option);
  }


  /**
   * 条件に一致したユーザー情報リストを返す
   * 
   * @param val1 :number ユーザー情報のval1(最小0)から最大5データを返す  
   *             :string ユーザー情報の名前に一致したデータを全て返す
   */
  find(val1: number | string): Promise<User[]> {
    if (typeof val1 === 'number') {
      return this.userRepository.find({ skip: val1, take: 5 });
    } else {
      return this.userRepository.find({ where: { name: val1 } });
    }
  }

  /**
   * ユーザーID(PK)と一致した情報を物理削除する
   * 
   * @param id ユーザーID
   */
  delete(id: string) {
    return this.userRepository.delete(id);
  }

  /**
   * ユーザーIDと一致したユーザー情報のnameを変更する
   * 
   * @param updateName ユーザー情報
   */
  updateNameSample1(updateName: RequestUpdateUser) {
    return this.userRepository.update(updateName.id, { name: updateName.name, password: updateName.password, email: updateName.email });
  }

  /**
   * ユーザーIDとパスワードが一致したユーザー情報のNAMEを変更する
   * 
   * @param updateName ユーザー情報
   */
  updateNameSample2(updateName: RequestUpdateUser) {
    return this.userRepository.update({ id: updateName.id, password: updateName.password }, { name: updateName.name, email: updateName.email });
  }

}

