import { DataSource } from 'typeorm';
import { CONFIG } from '../config/config';
// import * as Models from './models';

export class TypeOrm {
  static dataSource = new DataSource({
    type: 'mariadb',
    host: CONFIG.DB.HOSTNAME,
    username: CONFIG.DB.USERNAME,
    password: CONFIG.DB.PASSWORD, // 環境変数より取得
    port: CONFIG.DB.PORT,
    logging: false, // SQLログ
    database: CONFIG.DB.DATABASE,
    synchronize: true, // DBとのスキーマ同期(開発用)
    dropSchema: false, // スキーマ削除(開発用)
    charset: 'utf8mb4',
    entities: [],
  });
}
