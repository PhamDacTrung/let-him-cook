import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { DishIngredientInputDto } from './dish-ingredient.input.dto';

export class UpdateDishInputDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Dish 1' })
  name?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ example: ['image1', 'image2'] })
  images?: string[];

  @IsString()
  @IsOptional()
  @MaxLength(10000)
  @ApiPropertyOptional({ example: 'Dish 1 description' })
  description?: string;

  @IsOptional()
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
  ingredients?: DishIngredientInputDto[];
}
