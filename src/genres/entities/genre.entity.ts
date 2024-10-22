import { Column, PrimaryColumn } from 'typeorm';

export class Genre {
  @PrimaryColumn()
  id: number;

  @Column()
  genre: string;
}
