import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';

import configuration from '../config';
import { UserCreatingGuard } from './guards/auth.guard';

import { User } from './entities/user.entity';

import { UserRepository } from './repositories/user.repository';

import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { BookModule } from './modules/book/book.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'bookshelf',
      clientId: 'bookshelf-client',
      secret: 'WWbeOqwLvgspDPwHSe24R3cE8qErnihG',
      tokenValidation: TokenValidation.OFFLINE,
      logLevels: ['error', 'warn'],
      useNestLogger: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [resolve(__dirname, './entities/*{.ts,.js}')],
        migrationsTableName: 'migration',
        migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),

    MailModule,
    BookModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserCreatingGuard,
    },
  ],
})
export class AppModule {}
