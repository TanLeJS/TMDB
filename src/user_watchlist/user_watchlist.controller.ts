import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserWatchlistService } from './user_watchlist.service';
import { CreateUserWatchlistDto } from './dto/create-user_watchlist.dto';
import { UpdateUserWatchlistDto } from './dto/update-user_watchlist.dto';

@Controller('user-watchlist')
export class UserWatchlistController {
  constructor(private readonly userWatchlistService: UserWatchlistService) {}

  @Post()
  create(@Body() createUserWatchlistDto: CreateUserWatchlistDto) {
    return this.userWatchlistService.create(createUserWatchlistDto);
  }

  @Get()
  findAll() {
    return this.userWatchlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWatchlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserWatchlistDto: UpdateUserWatchlistDto) {
    return this.userWatchlistService.update(+id, updateUserWatchlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userWatchlistService.remove(+id);
  }
}
