import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class ChatMessageDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString({
    message: 'Vous devez entrer un message',
  })
  @IsNotEmpty({
    message: 'Votre message doit contenir au moins un caractère',
  })
  content: string;

  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsUUID()
  @IsNotEmpty()
  chatId: string;
}

export type sendChat = Pick<ChatMessageDTO, 'content'>;
