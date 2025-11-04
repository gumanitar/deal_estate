import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Required field' })
  email: string;

  @IsNotEmpty({ message: 'Required field' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;
}
