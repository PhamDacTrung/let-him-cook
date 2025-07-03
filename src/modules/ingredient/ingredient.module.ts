import { Ingredient } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnumInjectServiceToken } from '@common/enums';
import { IngredientService } from './services';

const Adapters = [
  {
    provide: EnumInjectServiceToken.INGREDIENT_SERVICE,
    useClass: IngredientService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class IngredientModule {}
