import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('uuid')
  userGuid: string;

  @Column('varchar')
  refreshToken: string;
}
