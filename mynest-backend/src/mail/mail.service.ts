/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail() {
    await this.mailerService.sendMail({
      to: 'test@example.com',
      subject: 'Test Email',
      template: './test',
      context: {
        name: 'John Doe',
      },
    });
    console.log('Test email sent');
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.FRONT_URL}/login/verify/${token}`;

    const mailMessageInfo = await this.mailerService.sendMail({
      to,
      subject: 'Vérifie ton compte',
      template: './verify',
      context: {
        url,
      },
    });
    console.log('Verification email sent', mailMessageInfo);
  }

  async sendResetPasswordRequestEmail(to: string, token: string) {
    const url = `${process.env.FRONT_URL}/login/reset-password/${token}`;

    const mailMessageInfo = await this.mailerService.sendMail({
      to,
      subject: 'Modifie ton mot de passe',
      template: './reset-password',
      context: {
        url,
      },
    });
    console.log('Reset Password email sent', mailMessageInfo);
  }
}
