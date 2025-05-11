import { Message } from "./message";

export interface Conversation {
  id: string;
  roomName: string;
  updatedAt: string;
  messages: Message[];
}
