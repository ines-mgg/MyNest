import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsString()
  @Type(() => String)
  password: string;
}

export class registerDto {
  @IsString()
  @Type(() => String)
  username: string;

  @IsEmail()
  @Type(() => String)
  email: string;

  @IsString()
  @Type(() => String)
  password: string;

  @IsString()
  @Type(() => String)
  role?: string;
}
