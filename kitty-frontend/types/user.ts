export enum Role {
  ADMIN = "GrooveTalkAdmin",
  MODO = "GrooveTalkModo",
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
}

export type login = Pick<User, "email" | "password">;

export type register = Pick<User, "username" | "email" | "password">;

export type updateUserDto = Omit<User, "id" | "password">;

export type updateUserPasswordDto = Pick<User, "password">;
