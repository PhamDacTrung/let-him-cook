import { TypeOfFood } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class IngredientInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Becon' })
  name: string;

  @IsEnum(TypeOfFood)
  @IsNotEmpty()
  @ApiProperty({ example: TypeOfFood.MEAT })
  type: TypeOfFood;
}
