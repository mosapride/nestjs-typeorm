/**
 * userテーブル定義DTO
 */
export type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  isActive: boolean;
  debug : boolean;
};

/**
 * ユーザー情報作成DTO
 */
export type RequestCreateUser = Omit<User, 'id' | 'isActive'>;

/**
 * レスポンス用ユーザー情報
 */
export type ResponseUser = Omit<User, 'id' | 'password' | 'isActive'>;

/**
 * 情報更新ユーザー情報
 * 
 * UserEntityから`isActive`を除いたType
 */
export type RequestUpdateUser = Omit<User, 'isActive'>;

