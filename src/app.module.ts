import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Genre } from './genres/entities/genre.entity';
import { GenresModule } from './genres/genres.module';
import { Movie } from './movies/entities/movie.entity';
import { MoviesModule } from './movies/movies.module';
import { UserFavorite } from './user_favorite/entities/user_favorite.entity';
import { UserFavoriteModule } from './user_favorite/user_favorite.module';
import { UserRating } from './user_ratings/entities/user_rating.entity';
import { UserRatingsModule } from './user_ratings/user_ratings.module';
import { UserWatchlistModule } from './user_watchlist/user_watchlist.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Movie, Genre, User, UserRating, UserFavorite],
      synchronize: true,
    }),
    UsersModule,
    GenresModule,
    MoviesModule,
    UserRatingsModule,
    UserWatchlistModule,
    UserFavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
