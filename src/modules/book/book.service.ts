import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from '../../entities/book.entity';
import { BookRepository } from '../../repositories/book.repository';


@Injectable()
export class BookService {
  private logger = new Logger(BookService.name);

  @InjectRepository(BookRepository)
  private bookRepository: BookRepository;


  async getAll(): Promise<Book[]> {
    const data = await this.bookRepository.getAll();

    return data;
  }
}
