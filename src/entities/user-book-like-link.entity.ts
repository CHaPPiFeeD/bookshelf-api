import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UserBookLikeLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  book_id: string;

  @Column('uuid')
  user_id: string;
}
