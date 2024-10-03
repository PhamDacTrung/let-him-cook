import { Ingredient } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';

import { INJECTION_SERVICE_TOKEN } from '@enums';
import { IngredientService } from './services';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.INGREDIENT_SERVICE,
    useClass: IngredientService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientController],
  providers: [...Adapters],
})
export class IngredientModule {}
