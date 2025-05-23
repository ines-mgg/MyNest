/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { requestType } from 'src/constants/types';
import { sendChat } from './dto/chatDTO';
import {
  createConversationDto,
  updateConversationNameDto,
} from 'src/conversation/dto/conversationDTO';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getConversations(@Request() request: requestType) {
    return await this.chatService.getConversations(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createConversation(
    @Body() postBody: createConversationDto,
    @Request() request: requestType,
  ) {
    return await this.chatService.createConversation(postBody, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':conversationId')
  async getConversation(
    @Param('conversationId') conversationId: string,
    @Request() request: requestType,
  ) {
    return await this.chatService.getConversation(
      request.user.id,
      conversationId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':conversationId')
  async sendChat(
    @Param('conversationId') conversationId: string,
    @Body() postBody: sendChat,
    @Request() request: requestType,
  ) {
    return await this.chatService.sendChat(
      postBody,
      conversationId,
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':conversationId')
  async updateConversationName(
    @Param('conversationId') conversationId: string,
    @Body() postBody: updateConversationNameDto,
    @Request() request: requestType,
  ) {
    return await this.chatService.updateConversationName(
      postBody,
      conversationId,
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':conversationId')
  async deleteConversation(
    @Param('conversationId') conversationId: string,
    @Request() request: requestType,
  ) {
    return await this.chatService.deleteConversation(
      conversationId,
      request.user.id,
    );
  }
}
