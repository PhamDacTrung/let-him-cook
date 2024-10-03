import { CurrentUser } from '@decorators';
import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { IUserService } from './interfaces';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  async getUserInfo(@CurrentUser() user: User) {
    return this.userService.getUserInfo(user.id);
  }
}
