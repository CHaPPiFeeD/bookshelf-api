import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('uuid')
  user_id: string;

  @Column('varchar')
  refresh_token: string;
}
