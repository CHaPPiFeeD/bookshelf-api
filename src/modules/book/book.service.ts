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

  createBook(user: User, data: CreateBookDto): Promise<Book> {
    const { name, description } = data;
    const { id: user_id } = user;

    return this.bookRepository.createAndSave({ name, description, user_id });
  }

  getOne(id: number) {
    return this.bookRepository.getOne(id);
  }
}
