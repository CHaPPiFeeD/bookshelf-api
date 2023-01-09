import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book, Comment } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ default: new Date().toISOString() })
  registrationDate: string;

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(type => Book, book => book.author)
  books: Book[];
}
