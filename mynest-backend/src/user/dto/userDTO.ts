import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class userDto {
  @IsUUID()
  @Type(() => String)
  id: string;

  @IsString({
    message: 'Vous devez saisir un pseudo',
  })
  @Type(() => String)
  username: string;

  @IsEmail(
    {},
    {
      message: 'Vous devez saisir une adresse mail valide',
    },
  )
  @Type(() => String)
  email: string;

  @IsNotEmpty({
    message: 'Le mot de passe ne peut pas être vide',
  })
  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @MaxLength(40, {
    message: 'Le mot de passe doit contenir au maximum 40 caractères',
  })
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

export type userPayload = Pick<userDto, 'id' | 'role'> & {
  iat: number;
  exp: number;
};

export type loginDto = Pick<userDto, 'email' | 'password'>;

export type registerDto = Pick<userDto, 'username' | 'email' | 'password'>;

export type updateUserDto = Omit<userDto, 'id' | 'password'>;

export type updateUserPasswordDto = Pick<userDto, 'password'>;
