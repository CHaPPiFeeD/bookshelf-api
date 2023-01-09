import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '.';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date().toISOString() })
  date: string;

  @Column()
  body: string;

  @ManyToOne(type => User, user => user.comments)
  author: User;
}