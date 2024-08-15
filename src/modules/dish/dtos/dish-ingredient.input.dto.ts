import { UnitOfMeasurement } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class DishIngredientInputDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426655440000' })
  ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  quantity: number;

  @IsEnum(UnitOfMeasurement)
  @IsNotEmpty()
  @ApiProperty({ example: UnitOfMeasurement.GRAM })
  unit: UnitOfMeasurement;
}
