import { Module } from '@nestjs/common';
import { UserRatingsService } from './user_ratings.service';
import { UserRatingsController } from './user_ratings.controller';

@Module({
  controllers: [UserRatingsController],
  providers: [UserRatingsService],
})
export class UserRatingsModule {}
