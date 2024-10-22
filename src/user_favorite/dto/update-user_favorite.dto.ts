import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFavoriteDto } from './create-user_favorite.dto';

export class UpdateUserFavoriteDto extends PartialType(CreateUserFavoriteDto) {}
