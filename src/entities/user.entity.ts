import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_guid: string;

  @Column('varchar', { length: 16 })
  nickname: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: false })
  is_banned: boolean;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => Book, book => book.author)
  books: Book;
}
