import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';


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

  getOne(id: number): Promise<any> {
    return this.bookRepository
      .createQueryBuilder('b')
      .select([
        'b.id',
        'b.name',
        'b.description',
        'u.name as author_name',
      ])
      .where('b.id = :id')
      .leftJoin('user', 'u', 'u.id = b.user_id')
      .setParameters({ id })
      .getRawOne();
  }

  createAndSave(data: any): Promise<any> {
    const entity = this.bookRepository.create(data);
    return this.bookRepository.save(entity);
  }
}
