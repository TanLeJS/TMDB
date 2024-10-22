import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, GenresModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
