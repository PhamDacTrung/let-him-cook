import { EnumTaste, EnumTemperature } from '@common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DishIngredientInputDto } from './dish-ingredient.input.dto';

export class DishBaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Dish 1' })
  name: string;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ example: ['image1', 'image2'] })
  images?: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  @ApiProperty({ example: 'Dish 1 description' })
  description: string;

  @Expose()
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

  @Expose()
  @IsOptional()
  @IsArray()
  @IsEnum(EnumTaste, { each: true })
  @ApiPropertyOptional({ example: [EnumTaste.SPICY, EnumTaste.SWEET] })
  tastes: EnumTaste[];

  @Expose()
  @IsOptional()
  @IsEnum(EnumTemperature)
  @ApiPropertyOptional({ example: EnumTemperature.HOT })
  temperature: EnumTemperature;
}

export class DishInputDto extends DishBaseDto {}

@Exclude()
export class DishResponseDto extends DishBaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426655440000' })
  id: string;
}
