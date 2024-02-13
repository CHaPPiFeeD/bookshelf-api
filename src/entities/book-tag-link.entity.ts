import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class BookTagLink {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  book_id: string;

  @Column('int')
  tag_id: number;
}
