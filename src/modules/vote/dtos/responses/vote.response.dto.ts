import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VoteResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @Expose()
  @ApiProperty({
    description: 'The id of the dish',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  dishId: string;

  @Expose()
  @ApiProperty({
    description: 'The rating of the vote',
    example: 5,
  })
  rating: number;

  @Expose()
  @ApiProperty({
    description: 'The comment of the vote',
    example: 'This is a comment',
  })
  comment: string;
}
