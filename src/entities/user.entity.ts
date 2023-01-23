import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar' })
  user_guid: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: false })
  is_banned: boolean;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
