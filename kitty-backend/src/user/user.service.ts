/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { userDto, userPayload } from './dto/userDTO';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    const allKittyChatters = await this.prisma.kittyChatter.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    return allKittyChatters;
  }

  async getUser(id: userDto['id']) {
    const kittyChatter = await this.prisma.kittyChatter.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        profilPicture: true,
        customBubbleColor: true,
        isAccountActivated: true,
      },
    });
    return kittyChatter;
  }

  async verifyUser(kittyChatterInfo: userPayload) {
    const { id, role } = kittyChatterInfo;

    const kittyChatter = await this.prisma.kittyChatter.update({
      where: {
        id: id,
        role: role,
      },
      data: {
        isAccountActivated: true,
      },
    });
    return kittyChatter;
  }

  async findByEmail(email: userDto['email']) {
    const kittyChatter = await this.prisma.kittyChatter.findUnique({
      where: {
        email,
      },
    });

    return kittyChatter;
  }

  async findByUsername(username: userDto['username']) {
    const kittyChatter = await this.prisma.kittyChatter.findUnique({
      where: {
        username,
      },
    });

    return kittyChatter;
  }
}
