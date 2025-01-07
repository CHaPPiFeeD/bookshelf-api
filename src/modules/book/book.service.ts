import { Injectable, Logger } from '@nestjs/common';

import { CreateBookDto, GetAllBooksQueryDto } from './book.dto';
import { BookInfo, BookRepository } from 'src/repositories/book.repository';
import { User } from 'src/entities/user.entity';


@Injectable()
export class BookService {
  private logger = new Logger(BookService.name);

  constructor(
    private bookRepository: BookRepository,
  ) { }

  getAll(params: GetAllBooksQueryDto): Promise<BookInfo[]> {
    return this.bookRepository.getAll(params);
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
