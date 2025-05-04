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
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  loginDto,
  registerDto,
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
  @Get('reset-password')
  async resetPassword(
    @Request() request: requestType,
    @Body() authBody: { password: userDto['password'] },
  ) {
    return await this.authService.resetPassword(request.user.id, authBody);
  }
}
