import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';


@Entity()
export class Genre {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @ManyToMany(() => Book, book => book.genres)
  books: Book;
}
