import { CurrentUser } from '@decorators';
import { User } from '@entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { DishService } from './dish.service';
import { DishInputDto } from './dtos';

@ApiTags('Dish')
@Controller('dish')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  async createDish(@CurrentUser() user: User, @Body() input: DishInputDto) {
    return await this.dishService.createDish(user.id, input);
  }

  @Get(':dishId')
  async getDish(@Param('dishId') dishId: string) {
    return await this.dishService.getDish(dishId);
  }

  @Put(':dishId')
  async updateDish(
    @Param('dishId') dishId: string,
    @Body() input: DishInputDto,
  ) {
    return await this.dishService.updateDish(dishId, input);
  }

  @Delete(':dishId')
  async deleteDish(@Param('dishId') dishId: string) {
    return await this.dishService.deleteDish(dishId);
  }
}
