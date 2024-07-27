import { TypeOfFood } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientInputDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Becon' })
  name?: string;

  @IsEnum(TypeOfFood)
  @IsOptional()
  @ApiPropertyOptional({ example: TypeOfFood.MEAT })
  type?: TypeOfFood;
}
