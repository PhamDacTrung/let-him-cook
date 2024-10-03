import { CurrentUser } from '@decorators';
import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { DishInputDto } from './dtos';
import { IDishService } from './interfaces';

@ApiTags('Dish')
@Controller('dish')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class DishController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.DISH_SERVICE)
    private readonly dishService: IDishService,
  ) {}

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
