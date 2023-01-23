import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


dotenv.config();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD.toString(),
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrationsTableName: 'migration',
  migrations: ['src/migrations/*{.ts,.js}'],
};

export default new DataSource(options);