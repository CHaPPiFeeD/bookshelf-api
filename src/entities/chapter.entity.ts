import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 128 })
  title: string;

  @Column('varchar')
  body: string;

  @Column('int')
  book_id: number;
}
