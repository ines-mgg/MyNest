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
} from '@nestjs/common';
import { loginDto, registerDto } from './dto/authDTO';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { userPayload } from 'src/user/dto/userDTO';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async auth(@Request() request: { user: userPayload }) {
    return await this.userService.getUser(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyUser(@Request() request: { user: userPayload }) {
    return await this.userService.verifyUser(request.user);
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
}
