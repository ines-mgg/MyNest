import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

export class SocketService implements OnGatewayInit {
  public server: Server;

  private _ready: () => void;
  public readonly ready = new Promise<void>((resolve) => {
    this._ready = resolve;
  });

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket server initialized');
    this._ready();
  }
}
