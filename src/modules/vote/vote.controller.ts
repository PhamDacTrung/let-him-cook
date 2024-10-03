import { CurrentUser } from '@decorators';
import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UpdateVoteInputDto } from './dtos';
import { IVoteService } from './interfaces';

@ApiTags('Vote')
@Controller('vote')
@UseGuards(JwtAuthGuard)
export class VoteController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.VOTE_SERVICE)
    private readonly voteService: IVoteService,
  ) {}

  @Get(':dishId')
  async getVotesByDishId(@Param('dishId') dishId: string) {
    return await this.voteService.getVotesByDishId(dishId);
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
