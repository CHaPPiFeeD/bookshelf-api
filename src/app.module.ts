import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: '' + process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [resolve(__dirname, './entities/*{.ts,.js}')],
      migrationsTableName: 'migration',
      migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
