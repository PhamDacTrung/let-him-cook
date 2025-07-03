import { ApiResponseWrapper, CurrentUser } from '@common/decorators';
import {
  EnumInjectServiceToken,
  EnumRbacAction,
  EnumRbacResource,
} from '@common/enums';
import { User } from '@entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RequirePermission } from '../../auth/guards';

import { PageOptionsDto } from '@common/pagination';
import { UpdateVoteInputDto } from '../dtos/requests';
import { VoteResponseDto } from '../dtos/responses';
import { IVoteService } from '../interfaces';

@ApiTags('Vote')
@Controller('vote')
@UseGuards(JwtAuthGuard)
export class VoteController {
  constructor(
    @Inject(EnumInjectServiceToken.VOTE_SERVICE)
    private readonly voteService: IVoteService,
  ) {}

  @Get(':dishId')
  @RequirePermission(EnumRbacAction.READ, {
    resourceType: EnumRbacResource.VOTE,
  })
  @ApiResponseWrapper(VoteResponseDto, 'Get votes by dish id')
  async getVotesByDishId(
    @Param('dishId') dishId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.voteService.getVotesByDishId(dishId, pageOptionsDto);
  }

  @Get(':dishId/my-vote')
  async getVoteByUserIdAndDishId(
    @CurrentUser() user: User,
    @Param('dishId') dishId: string,
  ) {
    return await this.voteService.getVoteByUserIdAndDishId(user.id, dishId);
  }

  @Post(':dishId')
  async createVote(@CurrentUser() user: User, @Param('dishId') dishId: string) {
    return await this.voteService.createVote(user.id, dishId);
  }

  @Put(':dishId')
  async updateVote(
    @CurrentUser() user: User,
    @Body() updateVoteInputDto: UpdateVoteInputDto,
  ) {
    return await this.voteService.updateVote(user.id, updateVoteInputDto);
  }

  @Delete(':voteId')
  async deleteVote(@CurrentUser() user: User, @Param('voteId') voteId: string) {
    return await this.voteService.deleteVote(user.id, voteId);
  }
}
