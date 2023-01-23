import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello world!';
  }
}
