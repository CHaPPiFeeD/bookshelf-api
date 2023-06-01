import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Comment } from './comment.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userGuid: string;

  @Column('varchar', { length: 16 })
  name: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: false })
  isBanned: boolean;

  @Column('boolean', { nullable: true, default: false })
  isVerified: boolean;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}
