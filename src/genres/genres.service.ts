import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
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

  async fetchGenres() {
    const moviesCount = await this.countGenres();
    if (moviesCount === 0) {
      try {
        const response = await lastValueFrom(
          this.httpService.get(this.apiURL, { headers: this.headersRequest }),
        );
        const allGenres = response.data.genres;

        const genresToInsert = allGenres
          .filter((genre) => genre.id && genre.name) // Ensure id and name are present
          .map((genre) => ({
            id: genre.id,
            genre: genre.name, // Set a fallback value for name
          }));
        return await this.genreRepository.insert(genresToInsert);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genreData = await this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genreData);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const userData = await this.genreRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const existingGenre = await this.findOne(id);
    const genreData = this.genreRepository.merge(existingGenre, updateGenreDto);
    return await this.genreRepository.save(genreData);
  }

  async remove(id: number): Promise<Genre> {
    const existingGenre = await this.findOne(id);
    return await this.genreRepository.remove(existingGenre);
  }
}
