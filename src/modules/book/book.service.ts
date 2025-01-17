import { Inject, Injectable, Logger } from '@nestjs/common';

import { CreateBookDto, GetAllBooksQueryDto } from './book.dto';
import { BookInfo, BookRepository } from 'src/repositories/book.repository';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from 'src/repositories/file.repository';
import { v4 as uuid_v4 } from 'uuid';
import { S3Service } from '../s3/s3.service';
import { CreateException } from 'src/exceptions/exception';
import { API_ERROR_CODES } from 'src/constants/error-codes';
import { FileService } from '../file/file.service';


@Injectable()
export class BookService {
  private logger = new Logger(BookService.name);

  @InjectRepository(FileRepository)
  private fileRepository: FileRepository;

  @InjectRepository(BookRepository)
  private bookRepository: BookRepository;

  @Inject(FileService)
  private fileService: FileService;

  @Inject(S3Service)
  private s3Service: S3Service;


  async getAll(params: GetAllBooksQueryDto): Promise<BookInfo[]> {
    const data = await this.bookRepository.getAll(params);
    for (let i = 0; i < data.length; i++) {
      const book = data[i];
      
      if (!book.coverid) continue;
      book.coverUrl = await this.fileService.getSignedUrl(book.coverid);
    }
  
    return data;
  }

  async createBook(user: User, payload: CreateBookDto): Promise<Book> {
    const { name, description } = payload;
    const { id: user_id } = user;

    const data = await this.bookRepository.createAndSave({ name, description, user_id });
    return data;
  }

  getOne(id: number) {
    return this.bookRepository.getOne(id);
  }

  async uploadCover(
    { file, userId, bookId }:
      { file: Express.Multer.File, userId: string, bookId: string }): Promise<string> {
    const bookObj = await this.bookRepository.findOneBy({ id: bookId, user_id: userId });
    if (!bookObj) throw new CreateException(API_ERROR_CODES.BOOK_NOT_FOUND);

    const key = `bookshelf/files/${uuid_v4()}`;

    const fileObj = await this.fileRepository.create({
      key,
      name: file.originalname,
      mime_type: file.mimetype,
      user_id: userId,
    });

    await this.s3Service.uploadFile({ key, file: file.buffer, mimeType: file.mimetype });
    await this.fileRepository.save(fileObj);
    await this.bookRepository.update({ id: bookObj.id }, { cover_id: fileObj.id });

    return this.s3Service.getSignedUrl(key);
  }
}
