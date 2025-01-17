import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  mime_type: string;

  @Column('uuid')
  user_id: string;
}
