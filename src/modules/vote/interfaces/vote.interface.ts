import { DeleteResponseDto, UpdateResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/pagination';
import { UpdateVoteInputDto } from '../dtos/requests';
import { VoteResponseDto } from '../dtos/responses';

export interface IVoteService {
  getAverageRatingNumberByDishId(dishId: string): Promise<number>;
  getVotesByDishId(
    dishId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<VoteResponseDto>>;
  getVoteByUserIdAndDishId(userId: string, dishId: string);
  createVote(userId: string, dishId: string): Promise<VoteResponseDto>;
  updateVote(
    userId: string,
    updateVoteInputDto: UpdateVoteInputDto,
  ): Promise<UpdateResponseDto>;
  deleteVote(userId: string, voteId: string): Promise<DeleteResponseDto>;
}
