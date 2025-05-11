import { Sender } from "./user";

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: Sender;
}
