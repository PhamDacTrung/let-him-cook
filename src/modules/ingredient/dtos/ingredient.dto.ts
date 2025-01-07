import { TypeOfFood } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class IngredientBaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Becon' })
  name: string;

  @Expose()
  @IsEnum(TypeOfFood)
  @IsNotEmpty()
  @ApiProperty({ example: TypeOfFood.MEAT })
  type: TypeOfFood;
}

export class IngredientInputDto extends IngredientBaseDto {}

@Exclude()
export class IngredientResponseDto extends IngredientBaseDto {
  @Expose()
  id: string;
}
