import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Genre } from 'src/genres/entities/genre.entity';

// create-user-dto
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray({ message: 'Genre should be an array' })
  @ArrayNotEmpty({ message: 'Genres array should not be empty' })
  @IsString({ each: true, message: 'Each genre should be a non-empty string' })
  @ArrayMinSize(1, { message: 'There should be at least one genre' })
  preferenceGenres: Genre[];
}
