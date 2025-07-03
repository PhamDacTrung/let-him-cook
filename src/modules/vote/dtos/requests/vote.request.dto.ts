import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateVoteInputDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the vote',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  voteId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The comment of the vote',
    example: 'This is a comment',
  })
  comment: string;
}
