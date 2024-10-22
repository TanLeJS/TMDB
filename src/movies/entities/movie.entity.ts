import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number; // TMDb movie ID will be used as the primary key

  @Column({ default: false })
  adult: boolean; // From "adult" field

  @Column()
  title: string; // From "title" field

  @Column({ nullable: true })
  backdropPath: string; // From "backdrop_path"

  @Column('simple-array')
  genreIds: number[]; // From "genre_ids" as an array

  @Column()
  originalLanguage: string; // From "original_language"

  @Column()
  originalTitle: string; // From "original_title"

  @Column('text')
  overview: string; // From "overview" field

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  popularity: number; // From "popularity" field

  @Column()
  posterPath: string; // From "poster_path"

  @Column()
  releaseDate: string; // From "release_date"

  @Column({ default: false })
  video: boolean; // From "video" field

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  voteAverage: number; // From "vote_average" field

  @Column()
  voteCount: number; // From "vote_count" field
}
