import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../mail/mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserRepository } from '../../repositories/user.repository';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    MailModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
