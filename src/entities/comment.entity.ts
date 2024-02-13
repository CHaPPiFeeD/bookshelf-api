import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column('varchar')
  body: string;

  @Column('uuid')
  user_id: string;
}
