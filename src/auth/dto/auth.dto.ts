import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/user/entities/user.entity';

export class SignupDto {
  @IsString()
  name: string;

  @IsString()
  username: string;


  @IsEmail()
  email: string;

  @IsOptional()
  age: number;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(['m', 'f', 'u'])
  gender: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
