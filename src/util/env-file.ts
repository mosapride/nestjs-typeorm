import { existsSync } from 'fs';
import { join } from 'path';

/**
 * dotenvで使用するファイル名を返す。
 * 
 * 環境変数`LEVEL`に指定した名前に依存し、`LEVEL`が存在しない場合はエラーをthrowする。
 * 
 * @return `.${process.env.LEVEL}.env`;
 */
export function getEnvFileName(): string {
  envCheck();
  return `.${process.env.LEVEL}.env`;
}

/**
 * dotenvで使用するファイルをフルパス付きで返す。
 * 
 * 環境変数`LEVEL`に指定した名前に依存し、`LEVEL`が存在しない場合はエラーをthrowする。
 * 
 * @return `join(__dirname, '..', '..', `.${process.env.LEVEL}.env`);
 */
export function getEnvFileNameFullPath(): string {
  envCheck();
  return join(process.cwd(),`.${process.env.LEVEL}.env`);
}

function envCheck(): void {
  if (!process.env.LEVEL) {
    throw new Error(`Not Found 'Environment variable' = "LEVEL"`);
  }

  const envFilePath = join(process.cwd(),`.${process.env.LEVEL}.env`);
  if (!existsSync(envFilePath)) {
    throw new Error(`Not Found "${envFilePath}"`);
  }
}