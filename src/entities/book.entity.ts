import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Genre } from './genre.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';


@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar')
  description: string;

  @ManyToOne(() => User, user => user.books)
  author: User;

  @OneToMany(() => Chapter, chapter => chapter.book, { cascade: true })
  chapters: Chapter[];

  @ManyToMany(() => Genre, genre => genre.books)
  genres: Genre[];

  @ManyToMany(() => Tag, tag => tag.books)
  tags: Tag[];
}
