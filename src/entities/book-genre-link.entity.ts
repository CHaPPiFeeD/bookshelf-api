import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class BookGenreLink {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  book_id: string;

  @Column('int')
  genre_id: number;
}
