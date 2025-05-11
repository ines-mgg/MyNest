import { Message } from "./message";
import { Sender } from "./user";

export interface ChatRoom {
  id: string;
  roomName: string;
  updatedAt: string;
  users: Sender[];
  messages: Message[];
}
