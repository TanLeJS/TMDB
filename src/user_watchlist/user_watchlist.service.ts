import { Injectable } from '@nestjs/common';
import { CreateUserWatchlistDto } from './dto/create-user_watchlist.dto';
import { UpdateUserWatchlistDto } from './dto/update-user_watchlist.dto';

@Injectable()
export class UserWatchlistService {
  create(createUserWatchlistDto: CreateUserWatchlistDto) {
    return 'This action adds a new userWatchlist';
  }

  findAll() {
    return `This action returns all userWatchlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userWatchlist`;
  }

  update(id: number, updateUserWatchlistDto: UpdateUserWatchlistDto) {
    return `This action updates a #${id} userWatchlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} userWatchlist`;
  }
}
