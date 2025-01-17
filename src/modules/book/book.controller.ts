import { Controller, Inject, Get, Body, Post, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';

import { BookService } from './book.service';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from './book.dto';
import { Public } from 'nest-keycloak-connect';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from '../../entities/user.entity';
import { BookInfo } from 'src/repositories/book.repository';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('/api/books')
export class BookController {
  @Inject(BookService)
  private bookService: BookService;

  @Public()
  @Get()
  getAll(@Query() params): Promise<BookInfo[]> {
    return this.bookService.getAll(params);
  }

  @Post()
  createBook(
    @User() user: UserEntity,
    @Body() body: CreateBookDto
  ): Promise<Book> {
    return this.bookService.createBook(user, body);
  }
  
  @Public()
  @Get('/:book_id')
  getOne(@Param('book_id') id: number) {
    return this.bookService.getOne(id);
  }

  @Post('/:book_id/cover/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCover(
    @User() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Param('book_id') bookId: string,
  ): Promise<string> {
    return this.bookService.uploadCover({ file, userId: user.id, bookId });
  }

}
