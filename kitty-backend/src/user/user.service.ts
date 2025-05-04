/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  registerDto,
  updateUserDto,
  updateUserPasswordDto,
  userDto,
  userPayload,
} from './dto/userDTO';
import { USER } from 'src/constants/roles';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}
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
        role: true,
      },
    });
    return kittyChatter;
  }

  async createUser(data: registerDto) {
    const newKittyChatter = await this.prisma.kittyChatter.create({
      data: {
        ...data,
        role: USER,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return newKittyChatter;
  }

  async updateUser(id: userDto['id'], data: updateUserDto) {
    return await this.prisma.kittyChatter.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePasswordUser(id: userDto['id'], data: updateUserPasswordDto) {
    const { password } = data;
    return await this.prisma.kittyChatter.update({
      data: {
        password: await this.utils.hashPassword(password),
      },
      where: {
        id,
      },
    });
  }

  async deleteUser(id: userDto['id']) {
    return await this.prisma.kittyChatter.delete({
      where: {
        id,
      },
    });
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
