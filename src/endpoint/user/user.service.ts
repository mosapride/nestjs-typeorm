import { RequestCreateUser, ResponseUser, RequestUpdateUser } from './user.dto';
import { UserEntity } from '../../typeorm/entity/user.entity';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  /**
   * 新しいユーザー情報を作成する
   * 
   * @param createUser ユーザー情報
   */
  create(createUser: RequestCreateUser) {
    const user: UserEntity = { ...new UserEntity(), ...createUser };
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
   * emailに一致したユーザー情報を返す
   * 
   * @param email email(unique key)
   */
  findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }


  /**
   * 条件に一致したユーザー情報リストを返す
   * 
   * @param val1 :number ユーザー情報のval1(最小0)から最大5データを返す  
   *             :string ユーザー情報の名前に一致したデータを全て返す
   */
  find(val1: number | string): Promise<UserEntity[]> {
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

