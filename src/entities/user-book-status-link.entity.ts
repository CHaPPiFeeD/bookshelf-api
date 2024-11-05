import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum BookUserStatus {
  LIKED = 'liked',
  READING = 'reading',
  READ = 'read',
  IN_FEATURE = 'planned',
  ABANDONED = 'abandoned',
}

@Entity()
export class UserBookStatusLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  book_id: string;

  @Column('uuid')
  user_id: string;

  @Column({
    type: 'enum',
    enum: BookUserStatus,
  })
  status: BookUserStatus;
}
