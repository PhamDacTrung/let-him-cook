import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DishIngredientInputDto } from './dish-ingredient.input.dto';

export class DishInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Dish 1' })
  name: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ example: ['image1', 'image2'] })
  images?: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  @ApiProperty({ example: 'Dish 1 description' })
  description: string;

  @IsArray()
  @Type(() => DishIngredientInputDto)
  @ApiProperty({
    example: [
      {
        ingredientId: '123e4567-e89b-12d3-a456-426655440000',
        quantity: 2,
        unit: 'GRAM',
      },
    ],
  })
  ingredients: DishIngredientInputDto[];
}
