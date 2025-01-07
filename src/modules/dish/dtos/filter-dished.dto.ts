import { Taste, Temperature } from '@enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterDishesDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Dish 1' })
  keyword?: string;

  @IsArray()
  @IsEnum(Taste, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiPropertyOptional({ example: [Taste.SMOOTH] })
  tastes?: Taste[];

  @IsEnum(Temperature)
  @IsOptional()
  @ApiPropertyOptional({ example: Temperature.HOT })
  temperature?: Temperature;
}
