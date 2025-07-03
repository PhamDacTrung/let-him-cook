import { EnumInjectServiceToken } from '@common/enums';
import { Dish, DishIngredient, DishTaste, DishTemperature } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from './services';

const Adapters = [
  {
    provide: EnumInjectServiceToken.DISH_SERVICE,
    useClass: DishService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dish,
      DishIngredient,
      DishTaste,
      DishTemperature,
    ]),
  ],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class DishModule {}
