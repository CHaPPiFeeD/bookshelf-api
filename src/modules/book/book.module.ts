import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from 'src/repositories/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}
