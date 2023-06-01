import { Controller, Inject, Get } from '@nestjs/common';

import { BookService } from './book.service';
import { Book } from '../../entities/book.entity';


@Controller('/api/books')
export class BookController {
  @Inject(BookService)
  private bookService: BookService;

  @Get()
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }
}
