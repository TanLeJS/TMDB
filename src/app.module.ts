import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';
import { TvsModule } from './tvs/tvs.module';
import { UserRatingsModule } from './user_ratings/user_ratings.module';
import { UserWatchlistModule } from './user_watchlist/user_watchlist.module';
import { UserFavoriteModule } from './user_favorite/user_favorite.module';

@Module({
  imports: [UsersModule, GenresModule, MoviesModule, TvsModule, UserRatingsModule, UserWatchlistModule, UserFavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
