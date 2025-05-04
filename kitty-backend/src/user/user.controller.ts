/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDto, updateUserPasswordDto, userDto } from './dto/userDTO';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ADMIN } from 'src/constants/roles';
import { requestType } from 'src/constants/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Request() request: requestType) {
    if (request.user.role === ADMIN) {
      return await this.userService.getUsers();
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':KittyId')
  async getUser(
    @Request() request: requestType,
    @Param('KittyId') KittyId: userDto['id'],
  ) {
    if (request.user.role === ADMIN) {
      return await this.userService.getUser(KittyId);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('patch/:KittyId')
  async patchUser(
    @Request() request: requestType,
    @Param('KittyId') KittyId: userDto['id'],
    @Body() patchBody: updateUserDto,
  ) {
    if (request.user.role === ADMIN) {
      return await this.userService.updateUser(KittyId, patchBody);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('patch/:KittyId/password')
  async patchUserPassword(
    @Request() request: requestType,
    @Param('KittyId') KittyId: userDto['id'],
    @Body() patchBody: updateUserPasswordDto,
  ) {
    if (request.user.role === ADMIN) {
      return await this.userService.updatePasswordUser(KittyId, patchBody);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:KittyId')
  async deleteUser(
    @Request() request: requestType,
    @Param('KittyId') KittyId: userDto['id'],
  ) {
    if (request.user.role === ADMIN) {
      return await this.userService.deleteUser(KittyId);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('connected/profil')
  async getProfil(@Request() request: requestType) {
    console.log(request);
    return await this.userService.getUser(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('connected/profil/patch')
  async patchProfil(
    @Request() request: requestType,
    @Body() patchBody: updateUserDto,
  ) {
    return await this.userService.updateUser(request.user.id, patchBody);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('connected/profil/patch/password')
  async patchProfilPassword(
    @Request() request: requestType,
    @Body() patchBody: updateUserPasswordDto,
  ) {
    return await this.userService.updatePasswordUser(
      request.user.id,
      patchBody,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('connected/profil/delete')
  async deleteProfil(@Request() request: requestType) {
    return await this.userService.deleteUser(request.user.id);
  }
}
