import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Book } from '../entities/book.entity';


@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async getAll(): Promise<Book[]> {
    const data = await this.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return data;
  }
}
