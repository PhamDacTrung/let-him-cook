// Use this route for user services

import { DishController } from '@modules/dish/controllers';
import { DishModule } from '@modules/dish/dish.module';
import { IngredientController } from '@modules/ingredient/controllers';
import { IngredientModule } from '@modules/ingredient/ingredient.module';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserModule } from '@modules/user/user.module';
import { VoteController } from '@modules/vote/controllers';
import { VoteModule } from '@modules/vote/vote.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    DishController,
    IngredientController,
    UserController,
    VoteController,
  ],
  providers: [],
  exports: [],
  imports: [DishModule, IngredientModule, UserModule, VoteModule],
})
export class RoutesUserModule {}
