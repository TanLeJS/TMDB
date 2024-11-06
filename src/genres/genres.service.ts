import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  headersRequest = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.configService.get<string>('THEMOVIEDB_ACCESSTOKEN')}`,
  };

  apiURL = `${this.configService.get<string>('THEMOVIEDB_URI')}genre/movie/list?language=en`;

  async countGenres() {
    return await this.genreRepository.count();
  }

  private async fetchGenres() {
    const moviesCount = await this.countGenres();
    if (moviesCount === 0) {
      try {
        const response = await lastValueFrom(
          this.httpService.get(this.apiURL, { headers: this.headersRequest }),
        );

        const allGenres = response.data.genres; // Adjusted to match TMDb's response structure
        const genresToInsert = allGenres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));

        await this.genreRepository.insert(genresToInsert);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
  }
}
