import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import {
  IngredientInputDto,
  IngredientResponseDto,
  UpdateIngredientInputDto,
} from '../dtos';

export interface IIngredientService {
  createIngredient(input: IngredientInputDto): Promise<IngredientResponseDto>;
  updateIngredient(
    ingredientId: string,
    input: UpdateIngredientInputDto,
  ): Promise<UpdateResponseDto>;
  deleteIngredient(ingredientId: string): Promise<DeleteResponseDto>;
  getAllIngredients(): Promise<IngredientResponseDto[]>;
  getIngredientById(ingredientId: string): Promise<IngredientResponseDto>;
}
