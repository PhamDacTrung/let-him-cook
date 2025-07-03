import { EnumTypeOfFood } from '@common/enums';
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
  @IsEnum(EnumTypeOfFood)
  @IsNotEmpty()
  @ApiProperty({ example: EnumTypeOfFood.MEAT })
  type: EnumTypeOfFood;
}

export class IngredientInputDto extends IngredientBaseDto {}

@Exclude()
export class IngredientResponseDto extends IngredientBaseDto {
  @Expose()
  id: string;
}
