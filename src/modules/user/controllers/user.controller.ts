import { User } from '@entities';

import { ApiResponseWrapper, CurrentUser } from '@common/decorators';
import {
  EnumInjectServiceToken,
  EnumRbacAction,
  EnumRbacResource,
} from '@common/enums';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RequirePermission } from '../../auth/guards';
import { UserResponseDto } from '../dtos';
import { IUserService } from '../interfaces';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    @Inject(EnumInjectServiceToken.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  @RequirePermission(EnumRbacAction.READ, {
    resourceType: EnumRbacResource.USER,
  })
  @ApiResponseWrapper(UserResponseDto, 'Get user info')
  async getUserInfo(@CurrentUser() user: User) {
    return this.userService.getUserInfo(user.id);
  }
}
