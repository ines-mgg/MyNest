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
import { ADMIN, MODO, USER } from 'src/constants/roles';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}
  async getAllUsers() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    return allUsers;
  }

  async getUser(id: userDto['id']) {
    const user = await this.prisma.user.findUnique({
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
    return user;
  }

  async getUserConversations(id: userDto['id']) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        conversations: {
          select: {
            id: true,
            roomName: true,
            updatedAt: true,
            users: {
              select: {
                id: true,
                username: true,
                profilPicture: true,
                customBubbleColor: true,
              },
            },
            messages: {
              select: {
                content: true,
                id: true,
                sender: {
                  select: {
                    id: true,
                    username: true,
                    profilPicture: true,
                    customBubbleColor: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'asc',
              },
              take: 1,
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });
    return user;
  }

  async createUser(data: registerDto) {
    const newUser = await this.prisma.user.create({
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
    return newUser;
  }

  async updateUser(id: userDto['id'], data: updateUserDto) {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePasswordUser(id: userDto['id'], data: updateUserPasswordDto) {
    const { password } = data;
    return await this.prisma.user.update({
      data: {
        password: await this.utils.hashPassword(password),
      },
      where: {
        id,
      },
    });
  }

  async deleteUser(id: userDto['id']) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async verifyUser(userInfo: userPayload) {
    const { id, role } = userInfo;

    const user = await this.prisma.user.update({
      where: {
        id: id,
        role: role,
      },
      data: {
        isAccountActivated: true,
      },
    });
    return user;
  }

  async findByEmail(email: userDto['email']) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByUsername(username: userDto['username']) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      where: {
        role: USER,
      },
    });

    return users;
  }

  async search(query: string, searcherRole: userDto['role']) {
    const users = await this.prisma.user.findMany({
      where: {
        role: searcherRole === USER ? USER : { in: [ADMIN, MODO, USER] },
        OR: [
          {
            username: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        profilPicture: true,
      },
    });
    return users;
  }
}
