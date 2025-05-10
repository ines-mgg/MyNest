import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { SocketService } from 'src/socket/socket.service';
import { AppGateway } from 'src/app.gateway';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    PrismaService,
    UserService,
    UtilsService,
    ConversationService,
    SocketService,
    AppGateway,
  ],
})
export class ChatModule {}
