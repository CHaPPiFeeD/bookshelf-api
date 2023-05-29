import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { AccessTokenDataType, InviteTokenDataType } from '../types';


@Injectable()
export class JwtService {
  @Inject(ConfigService)
  private configService: ConfigService;

  generateInviteToken(data: InviteTokenDataType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: 1000 * 60 * 60 * 24, // 1d
    });
  }

  generateAccessToken(data: AccessTokenDataType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: 1000 * 60 * 60, // 1h
    });
  }

  generateRefreshToken(data: AccessTokenDataType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 7d
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(
      token,
      this.configService.get('jwt.secret'),
      (error, decoded) => {
        if (error) throw new HttpException('Token is invalid or expired', 401);
        return decoded;
      }
    );
  }
}
