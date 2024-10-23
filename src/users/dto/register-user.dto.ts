import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Please fill up your name' })
  name: string;

  @IsEmail({}, { message: 'Please type an correct email' })
  @IsNotEmpty({ message: 'Please fill up your email' })
  email: string;

  @IsNotEmpty({ message: 'Please fill up your password ' })
  password: string;
}

export class RegisterGoogleUserDto {
  type: string;
  name: string;
  email: string;
}
