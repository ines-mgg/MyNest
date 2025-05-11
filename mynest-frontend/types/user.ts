import { Conversation } from "./conversation";

export enum Role {
  ADMIN = "GrooveTalkAdmin",
  USER = "GrooveTalkUser",
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isAccountActivated: boolean;
  profilPicture?: string;
  customBubbleColor?: string;
  conversations?: Conversation[];
}

export type Sender = Pick<
  User,
  "id" | "username" | "profilPicture" | "customBubbleColor"
>;

export type login = Pick<User, "email" | "password">;

export type register = Pick<User, "username" | "email" | "password">;

export type updateUserDto = Omit<User, "id" | "password">;

export type updateUserPasswordDto = Pick<User, "password">;
