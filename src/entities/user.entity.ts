import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 16 })
  name: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar', { nullable: true, length: 320 })
  description: string;

  @Column('boolean', { default: false })
  is_active: boolean;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
