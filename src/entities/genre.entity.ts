import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Genre {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 32 })
  name: string;
}
