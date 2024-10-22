import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRatingDto } from './create-user_rating.dto';

export class UpdateUserRatingDto extends PartialType(CreateUserRatingDto) {}
