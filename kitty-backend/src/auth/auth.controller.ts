/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Request,
  Param,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  loginDto,
  registerDto,
  updateUserDto,
  updateUserPasswordDto,
  userDto,
  userPayload,
} from 'src/user/dto/userDTO';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { requestType } from 'src/constants/types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async auth(@Request() request: requestType) {
    return await this.userService.getUser(request.user.id);
  }

  @Get('verify/:token')
  async verifyUser(@Param('token') token: string) {
    try {
      const decoded: userPayload = await this.jwtService.verifyAsync(token);
      return await this.userService.verifyUser(decoded);
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() authBody: { password: userDto['password'] },
  ) {
    try {
      const decoded: userPayload = await this.jwtService.verifyAsync(token);
      return await this.authService.resetPassword(decoded.id, authBody);
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authBody: loginDto) {
    return await this.authService.login(authBody);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() authBody: registerDto) {
    return await this.authService.register(authBody);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password-request')
  async resetPasswordRequest(@Body() authBody: { email: userDto['email'] }) {
    return await this.authService.resetPasswordRequest(authBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  async getProfil(@Request() request: requestType) {
    console.log(request);
    return await this.userService.getUser(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profil')
  async patchProfil(
    @Request() request: requestType,
    @Body() patchBody: updateUserDto,
  ) {
    return await this.userService.updateUser(request.user.id, patchBody);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profil-password')
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
  @Delete('profil')
  async deleteProfil(@Request() request: requestType) {
    return await this.userService.deleteUser(request.user.id);
  }
}
