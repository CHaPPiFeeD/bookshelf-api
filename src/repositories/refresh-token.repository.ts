import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshToken } from '../entities/refresh-token.entity';


@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  createAndSave(payload: CreateAndSavePayloadType): Promise<RefreshToken> {
    const { userGuid, refreshToken } = payload;

    const refreshTokenPayment = this.create({
      userGuid,
      refreshToken,
      expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    return this.save(refreshTokenPayment);
  }

  async updateOrCreateAndSave(payload: CreateAndSavePayloadType): Promise<void> {
    const { userGuid, refreshToken } = payload;

    const isUpdated = await this.update({ userGuid }, { refreshToken });
    if (!isUpdated) await this.createAndSave(payload);
  }
}


type CreateAndSavePayloadType = {
  userGuid: string,
  refreshToken: string,
}

