import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ConversationService, PrismaService],
})
export class ConversationModule {}
