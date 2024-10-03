import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import { UpdateVoteInputDto } from '../dtos';

export interface IVoteService {
  getAverageRatingNumberByDishId(dishId: string): Promise<number>;
  getVotesByDishId(dishId: string);
  getVoteByUserIdAndDishId(userId: string, dishId: string);
  createVote(userId: string, dishId: string);
  updateVote(
    userId: string,
    updateVoteInputDto: UpdateVoteInputDto,
  ): Promise<UpdateResponseDto>;
  deleteVote(userId: string, voteId: string): Promise<DeleteResponseDto>;
}
