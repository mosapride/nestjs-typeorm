# NestJS TypeORM

## 実行環境について

環境変数LEVELを設定することによりマルチ環境での動作を行える。デフォルトでは3環境を用意している。

| 環境変数=値        | envファイル名     | 意味                  |
|---------------|--------------|---------------------|
| LEVEL=debug   | .debug.env   | デバックモード。開発時に使用する。   |
| LEVEL=test    | .test.env    | テストモード。結合テストなどに使用する |
| LEVEL=release | .release.env | リリース環境。本番環境にて使用する   |

環境変数を増やすには

### 必要設定

DataBaseの設定が必要となる。

## サンプルMysql

```bash
cd docker
docker-compose up -d
```

