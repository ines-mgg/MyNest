/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto, registerDto } from './dto/authDTO';
import { PrismaService } from 'src/prisma.service';
import { hash, verify } from 'argon2';
import { userPayload } from 'src/user/dto/userDTO';
import { JwtService } from '@nestjs/jwt';
import { USER } from 'src/constants/roles';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async login(authBody: loginDto) {
    const { email, password } = authBody;
    const kittyChatterExist = await this.userService.findByEmail(email);

    if (!kittyChatterExist) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const isPasswordCorrect = await this.verifyPassword(
      password,
      kittyChatterExist.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Le mot de passe n'est pas correcte");
    }

    if (kittyChatterExist.isAccountActivated === false) {
      throw new UnauthorizedException("Le compte n'est pas activé");
    }

    return await this.createToken({
      id: kittyChatterExist.id,
      role: kittyChatterExist.role,
    });
  }

  async register(authBody: registerDto) {
    const { email, password, username, role } = authBody;
    const emailExists = await this.userService.findByEmail(email);
    const usernameExists = await this.userService.findByUsername(username);

    if (emailExists) {
      throw new UnauthorizedException(
        'Un compte existe déjà à cette adresse mail',
      );
    }

    if (usernameExists) {
      throw new UnauthorizedException('Ce pseudo est déjà pris');
    }

    const newKittyChatter = await this.prisma.kittyChatter.create({
      data: {
        email: email,
        password: await this.hashPassword(password),
        username: username,
        role: role || USER,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    const verifyToken = await this.createToken(
      {
        id: newKittyChatter.id,
        role: newKittyChatter.role,
      },
      '15m',
    );

    await this.mailService.sendVerificationEmail(
      newKittyChatter.email,
      verifyToken.token,
    );

    return {
      message:
        'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.',
      user: newKittyChatter,
    };
  }

  private async hashPassword(password: string) {
    return await hash(password, { hashLength: 24 });
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return await verify(hashedPassword, password);
  }

  private async createToken(userInfo: userPayload, expiresIn?: string) {
    const payload: userPayload = userInfo;

    return {
      token: await this.jwt.signAsync(payload, { expiresIn }),
    };
  }
}
