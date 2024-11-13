import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  headersRequest = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.configService.get<string>('THEMOVIEDB_ACCESSTOKEN')}`,
  };

  movieURL = `${this.configService.get<string>('THEMOVIEDB_URI')}movie/top_rated?language=en-US&page=3`;
  detailURL = `${this.configService.get<string>('THEMOVIEDB_URI')}movie`;

  @InjectRepository(Movie)
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movieData = await this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movieData);
  }

  async countMovies() {
    return await this.movieRepository.count();
  }

  async createBulkOfMovie() {
    try {
      const nowPlayingResponse = await lastValueFrom(
        this.httpService.get(`${this.movieURL}`, {
          headers: this.headersRequest,
        }),
      );
      const movieIds = nowPlayingResponse.data.results
        .map((movie) => movie.id)
        .filter((id) => id !== null && id !== undefined);

      const moviesToInsert = [];
      for (const id of movieIds) {
        const existingMovie = await this.movieRepository.findOne({
          where: { id },
        });

        if (!existingMovie && id) {
          // Ensure id exists and no duplicates
          try {
            const detailResponse = await lastValueFrom(
              this.httpService.get(`${this.detailURL}/${id}?language=en-US`, {
                headers: this.headersRequest,
              }),
            );
            const movieData = detailResponse.data;

            // Verify movieData has a valid id before adding to insert array
            if (movieData && movieData.id) {
              moviesToInsert.push({
                id: movieData.id,
                title: movieData.title,
                adult: movieData.adult,
                backdropPath: movieData.backdrop_path,
                overview: movieData.overview,
                originalLanguage: movieData.original_language,
                originalTitle: movieData.original_title,
                posterPath: movieData.poster_path,
                releaseDate: movieData.release_date,
                popularity: movieData.popularity,
                voteAverage: movieData.vote_average,
                voteCount: movieData.vote_count,
                genres: movieData.genres,
                belongsToCollection: movieData.belongs_to_collection,
                budget: movieData.budget,
                revenue: movieData.revenue,
                runtime: movieData.runtime,
                imdbId: movieData.imdb_id,
                homepage: movieData.homepage,
                productionCompanies: movieData.production_companies,
                productionCountries: movieData.production_countries,
                spokenLanguages: movieData.spoken_languages,
                tagline: movieData.tagline,
              });
            }
          } catch (detailError) {
            console.error(
              `Error fetching details for movie ID ${id}:`,
              detailError,
            );
          }
        }
      }

      if (moviesToInsert.length > 0) {
        await this.movieRepository.save(moviesToInsert);
      } else {
        console.warn('No movies to insert.');
      }
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const userData = await this.movieRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const existingGenre = await this.findOne(id);
    const genreData = this.movieRepository.merge(existingGenre, updateMovieDto);
    return await this.movieRepository.save(genreData);
  }

  async remove(id: number): Promise<Movie> {
    const existingGenre = await this.findOne(id);
    return await this.movieRepository.remove(existingGenre);
  }
}
