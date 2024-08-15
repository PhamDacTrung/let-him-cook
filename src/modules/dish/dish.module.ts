import { Dish, DishIngredient } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishIngredient])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
