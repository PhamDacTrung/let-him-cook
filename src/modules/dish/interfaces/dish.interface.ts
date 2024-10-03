import { DishInputDto, UpdateDishInputDto } from '../dtos';

export interface IDishService {
  createDish(userId: string, input: DishInputDto);
  getDish(dishId: string);
  updateDish(dishId: string, input: UpdateDishInputDto);
  deleteDish(dishId: string);
}
