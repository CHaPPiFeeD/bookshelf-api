import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column('varchar')
  body: string;

  @ManyToOne(() => User, user => user.comments)
  author: User;
}