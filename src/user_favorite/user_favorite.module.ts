import { Module } from '@nestjs/common';
import { UserFavoriteService } from './user_favorite.service';
import { UserFavoriteController } from './user_favorite.controller';

@Module({
  controllers: [UserFavoriteController],
  providers: [UserFavoriteService],
})
export class UserFavoriteModule {}
