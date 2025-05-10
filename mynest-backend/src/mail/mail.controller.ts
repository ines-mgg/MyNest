import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  //   Test with : curl http://localhost:3000/mail/test
  @Get('test')
  async sendTestEmail() {
    await this.mailService.sendTestEmail();
    return 'Test email sent';
  }
}
