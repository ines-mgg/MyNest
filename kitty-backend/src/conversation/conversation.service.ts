/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ConversationDto } from './dto/conversationDTO';
import { PrismaService } from 'src/prisma.service';
import { userDto } from 'src/user/dto/userDTO';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversation(id: ConversationDto['id']) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        messages: {
          select: {
            content: true,
            id: true,
            sender: {
              select: {
                id: true,
                username: true,
                profilPicture: true,
                customBubbleColor: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            profilPicture: true,
            customBubbleColor: true,
          },
        },
      },
    });

    return conversation;
  }

  async createConversation(
    roomName: ConversationDto['roomName'],
    recipientId: userDto['id'],
    senderId: userDto['id'],
  ) {
    const conversation = await this.prisma.conversation.create({
      data: {
        roomName,
        users: {
          connect: [
            {
              id: recipientId,
            },
            {
              id: senderId,
            },
          ],
        },
      },
    });

    return conversation;
  }

  async updateConversation(
    id: ConversationDto['id'],
    userId: userDto['id'],
    content: string,
  ) {
    const updateConversation = await this.prisma.conversation.update({
      where: {
        id,
      },
      data: {
        messages: {
          create: {
            content,
            sender: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        messages: {
          select: {
            content: true,
            id: true,
            sender: {
              select: {
                id: true,
                username: true,
                profilPicture: true,
                customBubbleColor: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return updateConversation;
  }
}
