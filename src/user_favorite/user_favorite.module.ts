import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { UserFavorite } from './entities/user_favorite.entity';
import { UserFavoriteController } from './user_favorite.controller';
import { UserFavoriteService } from './user_favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavorite, User, Movie])],
  controllers: [UserFavoriteController],
  providers: [UserFavoriteService],
  exports: [TypeOrmModule],
})
export class UserFavoriteModule {}
