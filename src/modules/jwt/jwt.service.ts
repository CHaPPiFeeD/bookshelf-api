import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { AccessTokenDataType, InviteTokenPayloadType } from './types';
import { CreateException } from '../../exceptions/exception';
import { API_ERROR_CODES } from '../../constants/error-codes';


@Injectable()
export class JwtService {
  @Inject(ConfigService)
  private configService: ConfigService;

  generateInviteToken(data: InviteTokenPayloadType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: this.configService.get('jwt.inviteTokenLifeTime'),
    });
  }

  generateAccessToken(data: AccessTokenDataType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: this.configService.get('jwt.accessTokenLifeTime'),
    });
  }

  generateRefreshToken(data: AccessTokenDataType): string {
    return jwt.sign(data, this.configService.get('jwt.secret'), {
      expiresIn: this.configService.get('jwt.refreshTokenLifeTime'),
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(
      token,
      this.configService.get('jwt.secret'),
      (error, decoded) => {
        if (error) throw new CreateException(API_ERROR_CODES.INVALID_TOKEN);
        return decoded;
      }
    );
  }
}
