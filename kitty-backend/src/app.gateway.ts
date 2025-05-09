/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
// Test request here : https://piehost.com/socketio-tester
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway(Number(process.env.GATEWAY_PORT) || 8000, {
  cors: true,
})
export class AppGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit
{
  @WebSocketServer()
  private readonly server: Server;
  constructor(private socketService: SocketService) {}

  afterInit(server: Server) {
    const addressInfo =
      typeof server.httpServer?.address() === 'object' &&
      server.httpServer?.address() !== null
        ? (server.httpServer.address() as import('net').AddressInfo)
        : null;

    const host =
      addressInfo?.address === '::' ? 'localhost' : addressInfo?.address;
    const port = addressInfo?.port || 'unknown';

    console.log(`WebSocket server initialized on URL: ws://${host}:${port}`);
  }

  onModuleInit() {
    this.socketService.server = this.server;
    console.log(
      'SocketService.server initialized in AppGateway:',
      !!this.socketService.server,
    );
    this.server.emit('confirmation');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('test')
  async sendMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log(data);
    socket.emit('chat', "Salut j'ai bien reçu ton message");
  }

  @SubscribeMessage('join-chat-room')
  async joinChatRoom(
    @MessageBody() conversationId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log({ 'join-chat-room | conversationId': conversationId });
    socket.join(conversationId);
  }

  @SubscribeMessage('connection')
  async sendConfirm(@ConnectedSocket() socket: Socket) {
    socket.emit('confirmation');
  }
}
