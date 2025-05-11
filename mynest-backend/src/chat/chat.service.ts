/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SocketService } from 'src/socket/socket.service';
import { sendChat } from './dto/chatDTO';
import { userDto } from 'src/user/dto/userDTO';
import { ConversationService } from 'src/conversation/conversation.service';
import {
  ConversationDto,
  createConversationDto,
  updateConversationNameDto,
} from 'src/conversation/dto/conversationDTO';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
    private readonly socketService: SocketService,
  ) {}

  private get socketServer() {
    if (!this.socketService.server) {
      throw new Error('Socket server is not initialized');
    }
    return this.socketService.server;
  }

  async createConversation(
    postBody: createConversationDto,
    senderId: userDto['id'],
  ) {
    const { recipientId, roomName } = postBody;
    try {
      const [existingRecipient, existingSender] = await Promise.all([
        this.userService.getUser(recipientId),
        this.userService.getUser(senderId),
      ]);

      if (!existingRecipient) {
        throw new Error("Le destinataire n'existe pas");
      }

      if (!existingSender) {
        throw new Error("L'utilisateur n'existe pas");
      }

      const conversation = await this.conversationService.createConversation(
        roomName,
        recipientId,
        senderId,
      );
      return {
        conversationId: conversation.id,
        message: 'La conversation a bien été créée.',
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: error.message,
      };
    }
  }
  async sendChat(
    postBody: sendChat,
    conversationId: ConversationDto['id'],
    senderId: userDto['id'],
  ) {
    try {
      const [existingConversation, existingUser] = await Promise.all([
        this.conversationService.getConversation(conversationId),
        this.userService.getUser(senderId),
      ]);

      if (!existingConversation) {
        throw new Error("La conversation n'existe pas");
      }

      if (!existingUser) {
        throw new Error("L'utilisateur n'existe pas");
      }

      const updatedConversation =
        await this.conversationService.updateConversation(
          conversationId,
          senderId,
          postBody.content,
        );
      this.socketServer
        .to(updatedConversation.id)
        .emit('send-chat-update', updatedConversation.messages);
      return { message: 'Le message a bien été envoyé' };
    } catch (error) {
      console.error(error);
      return { message: error.message };
    }
  }

  async getConversations(userId: userDto['id']) {
    const existingUser = await this.userService.getUserConversations(userId);
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }
    return existingUser.conversations;
  }

  async getConversation(
    userId: userDto['id'],
    conversationId: ConversationDto['id'],
  ) {
    const [existingConversation, existingUser] = await Promise.all([
      this.conversationService.getConversation(conversationId),
      this.userService.getUser(userId),
    ]);
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }
    if (!existingConversation) {
      throw new Error("La conversation n'existe pas");
    }

    return existingConversation;
  }

  async updateConversationName(
    postBody: updateConversationNameDto,
    conversationId: ConversationDto['id'],
    userId: userDto['id'],
  ) {
    const existing = await this.getConversation(userId, conversationId);
    if (!existing) {
      throw new Error("La conversation n'existe pas");
    }

    await this.conversationService.updateConversationName(
      conversationId,
      postBody.roomName,
    );
    return { message: 'Le nom de la conversation a bien été mis à jour' };
  }

  async deleteConversation(
    conversationId: ConversationDto['id'],
    userId: userDto['id'],
  ) {
    const existing = await this.getConversation(userId, conversationId);
    if (!existing) {
      throw new Error("La conversation n'existe pas");
    }

    await this.conversationService.deleteConversation(conversationId);
    return { message: 'La conversation a bien été supprimée' };
  }
}
