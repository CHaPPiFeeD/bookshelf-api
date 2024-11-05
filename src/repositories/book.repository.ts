import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from '../entities/book.entity';


@Injectable()
export class BookRepository extends Repository<Book> {
  @InjectRepository(Book)
  private bookRepository: Repository<Book>;

  getAll(): Promise<any[]> {
    return this.bookRepository
      .createQueryBuilder('b')
      .select([
        'b.id as id',
        'b.name as name',
        'b.description as description',
      ])
      .getRawMany();
  }

  getOne(id: number): Promise<BookInfo> {
    return this.bookRepository
      .createQueryBuilder('b')
      .select([
        'b.id',
        'b.name',
        'b.description',
        'u.name as author_name',
        'COALESCE(b.updated_at, b.created_at) as updated_at',
      ])
      .where('b.id = :id')
      .leftJoin('user', 'u', 'u.id = b.user_id')
      .setParameters({ id })
      .getRawOne();
  }

  async createAndSave(data: CreateBookData): Promise<void> {
    const entity = this.bookRepository.create(data);
    await this.bookRepository.save(entity);
  }
}

type BookInfo = {
  id: string;
  name: string;
  description: string;
  author_name: string;
  updated_at: string;
}

type CreateBookData = {
  name: string;
  description: string;
  user_id: string;
}
