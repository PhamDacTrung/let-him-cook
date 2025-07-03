import { DeleteResponseDto, UpdateResponseDto } from '@common/dtos';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/pagination';
import { Dish, DishIngredient, DishTaste, DishTemperature } from '@entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';
import {
  DishInputDto,
  DishResponseDto,
  FilterDishesDto,
  UpdateDishInputDto,
} from '../dtos';
import { IDishService } from '../interfaces';

@Injectable()
export class DishService implements IDishService {
  constructor(
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,

    @InjectRepository(DishIngredient)
    private readonly dishIngredientRepository: Repository<DishIngredient>,

    @InjectRepository(DishTaste)
    private readonly dishTasteRepository: Repository<DishTaste>,

    @InjectRepository(DishTemperature)
    private readonly dishTemperatureRepository: Repository<DishTemperature>,

    private readonly dataSource: DataSource,
  ) {}

  async createDish(
    userId: string,
    input: DishInputDto,
  ): Promise<DishResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createDish = queryRunner.manager.create(Dish, {
        ...input,
        authorId: userId,
      });

      const saveDish = await queryRunner.manager.save(Dish, createDish);
      if (!saveDish) {
        throw new BadRequestException('Failed to create dish');
      }

      // create Dish Ingredient for each ingredient in input
      for (const ingredient of input.ingredients) {
        const createDishIngredient = queryRunner.manager.create(
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

      if (input.tastes.length > 0) {
        // create Dish Taste for each taste in input
        await Promise.all(
          input.tastes.map(async (taste) => {
            const createDishTaste = queryRunner.manager.create(DishTaste, {
              dishId: saveDish.id,
              taste,
            });
            const saveDishTaste = await queryRunner.manager.save(
              DishTaste,
              createDishTaste,
            );
            if (!saveDishTaste) {
              throw new BadRequestException('Failed to create dish taste');
            }
          }),
        );
      }

      if (input.temperature) {
        const createDishTemperature = queryRunner.manager.create(
          DishTemperature,
          {
            dishId: saveDish.id,
            temperature: input.temperature,
          },
        );
        await queryRunner.manager.save(DishTemperature, createDishTemperature);
      }

      await queryRunner.commitTransaction();
      return plainToInstance(DishResponseDto, saveDish);
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

  async getDish(dishId: string): Promise<DishResponseDto> {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.id = :dishId', { dishId })
      .leftJoinAndMapMany(
        'dish.ingredients',
        DishIngredient,
        'dishIngredient',
        'dishIngredient.dishId = dish.id',
      )
      .leftJoinAndMapMany(
        'dish.tastes',
        DishTaste,
        'dishTaste',
        'dishTaste.dishId = dish.id',
      )
      .leftJoinAndMapOne(
        'dish.temperature',
        DishTemperature,
        'dishTemperature',
        'dishTemperature.dishId = dish.id',
      )
      .getOne();
    return plainToInstance(DishResponseDto, dish);
  }

  async getDishes(
    pageOptions: PageOptionsDto,
    filter: FilterDishesDto,
  ): Promise<PageDto<DishResponseDto>> {
    try {
      const { page, take, sort, sortDirection } = pageOptions;

      const dishesQuery = this.dishRepository
        .createQueryBuilder('dish')
        .leftJoinAndMapMany(
          'dish.ingredients',
          DishIngredient,
          'dishIngredient',
          'dishIngredient.dishId = dish.id',
        )
        .leftJoinAndMapMany(
          'dish.tastes',
          DishTaste,
          'dishTaste',
          'dishTaste.dishId = dish.id',
        )
        .leftJoinAndMapOne(
          'dish.temperature',
          DishTemperature,
          'dishTemperature',
          'dishTemperature.dishId = dish.id',
        )
        .take(take)
        .skip(pageOptions.skip);

      if (sort || sortDirection) {
        dishesQuery.orderBy(
          `dish.${sort || 'createdAt'}`,
          sortDirection || 'DESC',
        );
      }

      if (filter) {
        const { keyword, tastes, temperature } = filter;
        if (keyword) {
          const formattedQuery = keyword.trim().replace(/ /g, ' & ');
          const query = keyword ? `${formattedQuery}:*` : formattedQuery;
          dishesQuery.andWhere(
            "dish.search_vector @@ to_tsquery('simple',:query)",
            {
              query,
            },
          );
        }

        if (tastes?.length > 0) {
          // dishesQuery.andWhere('dishTaste.taste IN (:...tastes)', {
          //   tastes,
          // });

          dishesQuery.andWhere((qb) => {
            const subQuery = qb
              .subQuery()
              .select('dish_id')
              .from(DishTaste, 'dishTaste')
              .where('dishTaste.taste IN (:...tastes)', {
                tastes,
              })
              .groupBy('dish_id');
            return 'dish.id IN (' + subQuery.getQuery() + ')';
          });
        }

        if (temperature) {
          dishesQuery.andWhere('dishTemperature.temperature = :temperature', {
            temperature,
          });
        }
      }

      const [dishes, total] = await dishesQuery.getManyAndCount();

      const data = dishes.map((dish) => {
        return plainToInstance(DishResponseDto, dish);
      });

      const pageMeta = new PageMetaDto({
        take: take,
        page: page,
        itemCount: total,
      });

      return new PageDto(data, pageMeta);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateDish(
    dishId: string,
    input: UpdateDishInputDto,
  ): Promise<UpdateResponseDto> {
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
      return plainToInstance(UpdateResponseDto, {
        isSuccess: true,
        at: new Date(),
      });
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

  async deleteDish(dishId: string): Promise<DeleteResponseDto> {
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
      return plainToInstance(DeleteResponseDto, {
        isSuccess: true,
        at: new Date(),
      });
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
