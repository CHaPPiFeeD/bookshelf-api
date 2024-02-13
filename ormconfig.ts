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
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, 'src', 'entities/*{.ts,.js}')],
  migrationsTableName: 'migration',
  migrations: [join(__dirname, 'src', 'migrations/*.ts')],
};

export default new DataSource(options);
