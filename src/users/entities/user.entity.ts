import { Genre } from 'src/genres/entities/genre.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column()
  preferredLanguage: string;

  @Column()
  preferredFormat: string;
}
