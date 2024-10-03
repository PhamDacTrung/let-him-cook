import { Dish, DishIngredient } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { DishService } from './services';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.DISH_SERVICE,
    useClass: DishService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishIngredient])],
  controllers: [DishController],
  providers: [...Adapters],
})
export class DishModule {}
