/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { verify } from 'argon2';
import {
  loginDto,
  registerDto,
  userDto,
  userPayload,
} from 'src/user/dto/userDTO';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly utils: UtilsService,
  ) {}
  async login(authBody: loginDto) {
    const { email, password } = authBody;
    const userExist = await this.userService.findByEmail(email);

    if (!userExist) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const isPasswordCorrect = await this.verifyPassword(
      password,
      userExist.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Le mot de passe n'est pas correcte");
    }

    if (userExist.isAccountActivated === false) {
      throw new UnauthorizedException("Le compte n'est pas activé");
    }

    return await this.createToken(
      {
        id: userExist.id,
        role: userExist.role,
      },
      '6h',
    );
  }

  async register(authBody: registerDto) {
    const { email, password, username } = authBody;
    const emailExists = await this.userService.findByEmail(email);
    const usernameExists = await this.userService.findByUsername(username);
    const hashedPassword = await this.utils.hashPassword(password);

    if (emailExists) {
      throw new UnauthorizedException(
        'Un compte existe déjà à cette adresse mail',
      );
    }

    if (usernameExists) {
      throw new UnauthorizedException('Ce pseudo est déjà pris');
    }

    const newUser = await this.userService.createUser({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const verifyToken = await this.createToken(
      {
        id: newUser.id,
        role: newUser.role,
      },
      '15m',
    );

    await this.mailService.sendVerificationEmail(
      newUser.email,
      verifyToken.token,
    );

    return {
      message:
        'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.',
      user: newUser,
    };
  }

  async resetPasswordRequest(authBody: { email: userDto['email'] }) {
    const { email } = authBody;
    const userExists = await this.userService.findByEmail(email);
    if (!userExists) {
      throw new UnauthorizedException(
        "Aucun compte n'a été trouvé avec cette adresse mail",
      );
    }

    const resetPasswordToken = await this.createToken(
      {
        id: userExists.id,
        role: userExists.role,
      },
      '15m',
    );

    await this.mailService.sendResetPasswordRequestEmail(
      userExists.email,
      resetPasswordToken.token,
    );

    return {
      message:
        'Votre compte a été trouvé ! Un mail vous a été envoyé pour modifier votre mot de passe',
      user: userExists,
    };
  }

  async resetPassword(
    id: userDto['id'],
    authBody: { password: userDto['password'] },
  ) {
    const resetPasswordUser = await this.userService.updatePasswordUser(
      id,
      authBody,
    );

    return {
      message:
        'Votre mot de passe a été modifié ! Vous pouvez essayer de vous connecter',
      user: resetPasswordUser,
    };
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return await verify(hashedPassword, password);
  }

  private async createToken(
    userInfo: Omit<userPayload, 'iat' | 'exp'>,
    expiresIn?: string,
  ) {
    return {
      token: await this.jwt.signAsync(userInfo, { expiresIn }),
    };
  }
}
