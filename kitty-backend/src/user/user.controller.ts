import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/userDTO';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:KittyId')
  getUser(@Param('KittyId') KittyId: userDto['id']) {
    return this.userService.getUser(KittyId);
  }
}
