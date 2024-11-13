import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column()
  genre: string;
}
