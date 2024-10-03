import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import { Vote } from '@entities';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVoteInputDto } from '../dtos';
import { IVoteService } from '../interfaces';

@Injectable()
export class VoteService implements IVoteService {
  constructor(
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
  ) {}

  async getAverageRatingNumberByDishId(dishId: string): Promise<number> {
    try {
      return await this.voteRepository
        .createQueryBuilder('vote')
        .select('AVG(vote.rating)', 'averageRating')
        .where('vote.dishId = :dishId', { dishId })
        .getRawOne();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getVotesByDishId(dishId: string) {
    try {
      return await this.voteRepository.findBy({ dishId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getVoteByUserIdAndDishId(userId: string, dishId: string) {
    try {
      return await this.voteRepository.findBy({ userId, dishId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createVote(userId: string, dishId: string) {
    try {
      const newVote = await this.voteRepository.create({ userId, dishId });
      const saveVote = await this.voteRepository.save(newVote);
      if (!saveVote) {
        throw new BadRequestException('Failed to create vote');
      }
      return saveVote;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateVote(
    userId: string,
    updateVoteInputDto: UpdateVoteInputDto,
  ): Promise<UpdateResponseDto> {
    try {
      const { voteId, comment } = updateVoteInputDto;

      const vote = await this.voteRepository.findOneBy({ id: voteId });
      if (!vote) {
        throw new BadRequestException('Vote not found');
      }

      if (vote.userId !== userId) {
        throw new BadRequestException(
          'You are not authorized to update this vote',
        );
      }
      const updateVote = await this.voteRepository.update(voteId, { comment });
      if (!updateVote) {
        throw new BadRequestException('Failed to update vote');
      }

      return {
        isUpdated: true,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteVote(userId: string, voteId: string): Promise<DeleteResponseDto> {
    try {
      const vote = await this.voteRepository.findOneBy({ id: voteId });
      if (!vote) {
        throw new BadRequestException('Vote not found');
      }

      if (vote.userId !== userId) {
        throw new BadRequestException(
          'You are not authorized to delete this vote',
        );
      }
      const deleteVote = await this.voteRepository.softDelete(voteId);
      if (!deleteVote) {
        throw new BadRequestException('Failed to delete vote');
      }
      return { isDeleted: true };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
