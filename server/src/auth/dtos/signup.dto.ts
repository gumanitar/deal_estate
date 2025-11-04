import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Required field' })
  @MinLength(2, { message: 'Name must contain at least 2 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Required field' })
  email: string;

  @IsNotEmpty({ message: 'Required field' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;
}
