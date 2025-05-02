import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class userDto {
  @IsUUID()
  @Type(() => String)
  id: string;

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
  role: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  profilPicture?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  customBubbleColor?: string;

  @IsBoolean()
  @Type(() => Boolean)
  isAccountActivated: boolean;
}

export type userPayload = Pick<userDto, 'id' | 'role'>;
