import { Module } from '@nestjs/common';
import { UserWatchlistService } from './user_watchlist.service';
import { UserWatchlistController } from './user_watchlist.controller';

@Module({
  controllers: [UserWatchlistController],
  providers: [UserWatchlistService],
})
export class UserWatchlistModule {}
