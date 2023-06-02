import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ObjectID, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/entities/user.entity';


@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  createUnverified(payload: CreateUnverifiedPayloadType): Promise<User> {
    const { name, email, password } = payload;

    const entity = this.create({
      name,
      email,
      password,
      isBanned: false,
      isVerified: false,
    });

    return this.save(entity);
  }

  confirmVerification(where: WhereType): Promise<UpdateResult> {
    return this.update(where, { isVerified: true });
  }
}


type CreateUnverifiedPayloadType = {
  name: string;
  email: string;
  password: string;
}

type WhereType = string
  | number
  | Date
  | ObjectID
  | string[]
  | number[]
  | Date[]
  | ObjectID[]
  | FindOptionsWhere<User>;



