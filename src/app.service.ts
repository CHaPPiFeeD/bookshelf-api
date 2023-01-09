import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class AppService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  getHello(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
