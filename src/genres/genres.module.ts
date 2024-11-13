import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Genre } from './entities/genre.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Genre, User])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
