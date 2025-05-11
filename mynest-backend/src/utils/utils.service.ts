import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class UtilsService {
  async hashPassword(password: string) {
    return await hash(password, { hashLength: 24 });
  }
}
