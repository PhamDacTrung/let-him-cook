import { DeleteResponseDto, UpdateResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/pagination';
import {
  DishInputDto,
  DishResponseDto,
  FilterDishesDto,
  UpdateDishInputDto,
} from '../dtos';

export interface IDishService {
  createDish(userId: string, input: DishInputDto): Promise<DishResponseDto>;
  getDish(dishId: string): Promise<DishResponseDto>;
  getDishes(
    pageOptions: PageOptionsDto,
    filter: FilterDishesDto,
  ): Promise<PageDto<DishResponseDto>>;
  updateDish(
    dishId: string,
    input: UpdateDishInputDto,
  ): Promise<UpdateResponseDto>;
  deleteDish(dishId: string): Promise<DeleteResponseDto>;
}
