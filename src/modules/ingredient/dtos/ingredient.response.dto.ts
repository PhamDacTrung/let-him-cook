import { TypeOfFood } from '@enums';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class IngredientResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  typeOfFood: TypeOfFood;
}
