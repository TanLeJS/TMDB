import { Genre } from 'src/genres/entities/genre.entity';

export interface IUser {
  name: string;
  email: string;
  preferenceGenres: Genre[];
}
