import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateVoteInputDto {
  @IsUUID()
  @IsNotEmpty()
  voteId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
