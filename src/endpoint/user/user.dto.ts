/**
 * userテーブル定義DTO
 */
export type User = {
  // ユニークなID(DBから自動生成)
  id: number;
  // 名前
  name: string;
  // ハッシュ化されたパスワード
  password: string;
  // 平文パスワード(デバック用で運用では実装してはいけない)
  plainPassword: string;
  // emailアドレス
  email: string;
  // アクティブフラグ
  isActive: boolean;
  // 登録日
  registered: Date;
  // 更新日
  modified: Date;
};

/**
 * ユーザー情報作成DTO
 */
export type RequestCreateUser = Pick<User, 'name' | 'password' | 'email'>;

/**
 * レスポンス用ユーザー情報
 */
export type ResponseUser = Pick<User, 'name' | 'email'>;

/**
 * 情報更新ユーザー情報
 * 
 * UserEntityから`isActive`を除いたType
 */
export type RequestUpdateUser = Omit<User, 'isActive'>;

/**
 * ハッシュ化したデータのJWT形式。
 */
export type AuthJwtHash = {
  email : string;
  modified : Date;

};

/**
 * ハッシュ化したデータのJWT形式。
 */
export type EncryptionAuthJwtHash = {
  email : string;
  modified : string;
  iv? :string;
};

