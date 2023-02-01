import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';


@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 128 })
  title: string;

  @Column('varchar')
  body: string;

  @ManyToOne(() => Book, book => book.chapters)
  book: Book;
}
