import { EnumTypeOfFood } from '@common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientInputDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Becon' })
  name?: string;

  @IsEnum(EnumTypeOfFood)
  @IsOptional()
  @ApiPropertyOptional({ example: EnumTypeOfFood.MEAT })
  type?: EnumTypeOfFood;
}
