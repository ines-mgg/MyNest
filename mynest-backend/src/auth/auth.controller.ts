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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';

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
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Express } from 'express';

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
    return await this.userService.getProfil(request.user.id);
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

  @UseGuards(JwtAuthGuard)
  @Post('profil-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads/profil-pictures',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only JPG/PNG files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2 Mo
      },
    }),
  )
  async uploadProfilPicture(
    @Request() request: requestType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.uploadProfilPicture(
      request.user.id,
      file.filename,
    );
  }
}
