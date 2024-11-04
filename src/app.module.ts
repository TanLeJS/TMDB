import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';
import { UserFavoriteModule } from './user_favorite/user_favorite.module';
import { UserRatingsModule } from './user_ratings/user_ratings.module';
import { UserWatchlistModule } from './user_watchlist/user_watchlist.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [],
      synchronize: true, // set to false in production
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
