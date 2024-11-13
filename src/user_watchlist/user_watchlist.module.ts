import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWatchlist } from './entities/user_watchlist.entity';
import { UserWatchlistController } from './user_watchlist.controller';
import { UserWatchlistService } from './user_watchlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserWatchlist])],
  controllers: [UserWatchlistController],
  providers: [UserWatchlistService],
})
export class UserWatchlistModule {}
