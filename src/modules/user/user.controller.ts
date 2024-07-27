import { CurrentUser } from '@decorators';
import { User } from '@entities';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@CurrentUser() user: User) {
    return this.userService.getUserInfo(user.id);
  }
}
