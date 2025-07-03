import { EnumTaste, EnumTemperature } from '@common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterDishesDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Dish 1' })
  keyword?: string;

  @IsArray()
  @IsEnum(EnumTaste, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ApiPropertyOptional({ example: [EnumTaste.SMOOTH] })
  tastes?: EnumTaste[];

  @IsEnum(EnumTemperature)
  @IsOptional()
  @ApiPropertyOptional({ example: EnumTemperature.HOT })
  temperature?: EnumTemperature;
}
