import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('uuid')
  user_id: string;
}
