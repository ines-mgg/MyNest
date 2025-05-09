import { Type } from 'class-transformer';
import {
  IsUUID,
  IsDate,
  ValidateNested,
  IsArray,
  IsString,
} from 'class-validator';

export class ConversationDto {
  @IsUUID()
  @Type(() => String)
  id: string;

  @IsString()
  @Type(() => String)
  roomName: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  users: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  messages: string[];
}

export class createConversationDto {
  @IsString({
    message: 'Vous devez spécifier le nom de la conversation',
  })
  @Type(() => String)
  roomName: string;

  @IsString({
    message: 'Vous devez spécifier le destinataire',
  })
  @Type(() => String)
  recipientId: string;
}
