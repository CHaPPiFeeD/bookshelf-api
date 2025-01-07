import { Controller, Inject, Get, Body, Post, Param, Query } from '@nestjs/common';

import { BookService } from './book.service';
import { Book } from '../../entities/book.entity';
import { CreateBookDto, GetAllBooksQueryDto } from './book.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from '../../entities/user.entity';
import { BookInfo } from 'src/repositories/book.repository';


@Controller('/api/books')
export class BookController {
  @Inject(BookService)
  private bookService: BookService;

  @Unprotected()
  @Get()
  getAll(@Query() params): Promise<BookInfo[]> {
    return this.bookService.getAll(params);
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
  ): Promise<string> {
    return this.bookService.createBook(user, body);
  }
}
