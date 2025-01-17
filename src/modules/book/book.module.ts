import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from 'src/repositories/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { FileRepository } from 'src/repositories/file.repository';
import { FileEntity } from 'src/entities/file.entity';
import { S3Module } from '../s3/s3.module';
import { FileModule } from '../file/file.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Book, FileEntity]),
    S3Module,
    FileModule,
  ],
  controllers: [BookController],
  providers: [BookRepository, FileRepository, BookService],
})
export class BookModule {}
