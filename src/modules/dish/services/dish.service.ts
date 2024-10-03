import { Dish, DishIngredient } from '@entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DishInputDto, UpdateDishInputDto } from '../dtos';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
    @InjectRepository(DishIngredient)
    private readonly dishIngredientRepository: Repository<DishIngredient>,
    private readonly dataSource: DataSource,
  ) {}

  async createDish(userId: string, input: DishInputDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createDish = await queryRunner.manager.create(Dish, {
        ...input,
        authorId: userId,
      });

      const saveDish = await queryRunner.manager.save(Dish, createDish);
      if (!saveDish) {
        throw new BadRequestException('Failed to create dish');
      }

      // create Dish Ingredient for each ingredient in input
      for (const ingredient of input.ingredients) {
        const createDishIngredient = await queryRunner.manager.create(
          DishIngredient,
          {
            ...ingredient,
            dishId: saveDish.id,
          },
        );
        const saveDisIngredient = await queryRunner.manager.save(
          DishIngredient,
          createDishIngredient,
        );
        if (!saveDisIngredient) {
          throw new BadRequestException('Failed to create dish ingredient');
        }
      }
      await queryRunner.commitTransaction();
      return saveDish;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async getDish(dishId: string) {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.id = :dishId', { dishId })
      .leftJoinAndMapMany(
        'dish.ingredients',
        DishIngredient,
        'dishIngredient',
        'dishIngredient.dishId = dish.id',
      )
      .getOne();
    return dish;
  }

  async updateDish(dishId: string, input: UpdateDishInputDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // connect to database
    await queryRunner.startTransaction(); // start transaction

    try {
      const updateDish = await queryRunner.manager
        .createQueryBuilder()
        .update(Dish)
        .set({ ...input })
        .where('id = :dishId', { dishId })
        .execute();
      if (!updateDish) {
        throw new BadRequestException('Failed to update dish');
      }

      const deleteDishIngredient = await queryRunner.manager
        .createQueryBuilder()
        .softDelete()
        .from(DishIngredient)
        .where('dishId = :dishId', { dishId })
        .execute();
      if (!deleteDishIngredient) {
        throw new BadRequestException('Failed to delete dish ingredient');
      }

      // create Dish Ingredient for each ingredient in input
      for (const ingredient of input.ingredients) {
        const createDishIngredient = await queryRunner.manager.create(
          DishIngredient,
          {
            ...ingredient,
            dishId,
          },
        );
        const saveDisIngredient = await queryRunner.manager.save(
          DishIngredient,
          createDishIngredient,
        );
        if (!saveDisIngredient) {
          throw new BadRequestException('Failed to create dish ingredient');
        }
      }

      await queryRunner.commitTransaction();
      return updateDish;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteDish(dishId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // connect to database
    await queryRunner.startTransaction(); // start transaction

    try {
      const deleteDish = await queryRunner.manager
        .createQueryBuilder()
        .softDelete()
        .from(Dish)
        .where('id = :dishId', { dishId })
        .execute();

      if (!deleteDish) {
        throw new BadRequestException('Failed to delete dish');
      }

      const deleteDishIngredient = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(DishIngredient)
        .where('dishId = :dishId', { dishId })
        .execute();

      if (!deleteDishIngredient) {
        throw new BadRequestException('Failed to delete dish ingredient');
      }

      await queryRunner.commitTransaction();
      return deleteDish;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
