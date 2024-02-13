import { Controller, Inject, Get, Body, Post, Param } from '@nestjs/common';

import { BookService } from './book.service';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from '../../entities/user.entity';


@Controller('/api/books')
export class BookController {
  @Inject(BookService)
  private bookService: BookService;

  @Unprotected()
  @Get()
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Unprotected()
  @Get('/:book_id')
  getOne(@Param('book_id') id: number) {
    return this.bookService.getOne(id);
  }

  @Post()
  createBook(
    @User() user: UserEntity,
    @Body() body: CreateBookDto
  ): Promise<Book> {
    return this.bookService.createBook(user, body);
  }
}
