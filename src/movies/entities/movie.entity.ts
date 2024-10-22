import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn() // TMDb ID as the primary key
  id: number;

  @Column({ default: false })
  adult: boolean;

  @Column()
  backdropPath: string;

  @Column()
  title: string;

  @Column('text')
  overview: string;

  @Column()
  originalLanguage: string;

  @Column()
  originalTitle: string;

  @Column()
  posterPath: string;

  @Column()
  releaseDate: string;

  @Column('float')
  popularity: number;

  @Column('float')
  voteAverage: number;

  @Column()
  voteCount: number;

  @Column('json', { nullable: true })
  genres: { id: number; name: string }[];

  @Column('json', { nullable: true })
  belongsToCollection: { id: number; name: string; backdropPath: string };

  @Column()
  budget: number;

  @Column()
  revenue: number;

  @Column()
  runtime: number;

  @Column({ nullable: true })
  imdbId: string;

  @Column('text', { nullable: true })
  homepage: string;

  @Column('json', { nullable: true })
  productionCompanies: { id: number; name: string; logoPath: string }[];

  @Column('json', { nullable: true })
  productionCountries: { iso_3166_1: string; name: string }[];

  @Column('json', { nullable: true })
  spokenLanguages: { iso_639_1: string; name: string }[];

  @Column({ nullable: true })
  tagline: string;
}
