import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '../jwt/jwt.module';
import { RefreshToken } from 'src/entities/refresh-token.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    MailModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
