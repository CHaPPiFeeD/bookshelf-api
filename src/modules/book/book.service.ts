import { Injectable, Logger } from '@nestjs/common';

import { Book } from '../../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRepository } from 'src/repositories/book.repository';
import { User } from 'src/entities/user.entity';


@Injectable()
export class BookService {
  private logger = new Logger(BookService.name);

  constructor(
    private bookRepository: BookRepository,
  ) { }

  getAll(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }

  async createBook(user: User, data: CreateBookDto): Promise<string> {
    const { name, description } = data;
    const { id: user_id } = user;

    await this.bookRepository.createAndSave({ name, description, user_id });
    return 'ok';
  }

  getOne(id: number) {
    return this.bookRepository.getOne(id);
  }
}
