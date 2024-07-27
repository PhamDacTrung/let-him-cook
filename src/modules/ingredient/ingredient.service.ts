import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import { Ingredient } from '@entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { IngredientInputDto } from './dtos';
import { IngredientResponseDto } from './dtos/ingredient.response.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async createIngredient(
    input: IngredientInputDto,
  ): Promise<IngredientResponseDto> {
    try {
      const ingredient = this.ingredientRepository.create(input);
      const newIngredient = await this.ingredientRepository.save(ingredient);
      if (!newIngredient) {
        throw new BadRequestException('Cannot create ingredient');
      }
      return plainToInstance(IngredientResponseDto, newIngredient);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateIngredient(
    ingredientId: string,
    input: IngredientInputDto,
  ): Promise<UpdateResponseDto> {
    try {
      const ingredient = await this.ingredientRepository.findOneBy({
        id: ingredientId,
      });
      if (!ingredient) {
        throw new BadRequestException('Ingredient not found');
      }

      const updatedIngredient = await this.ingredientRepository.update(
        ingredientId,
        {
          ...input,
        },
      );

      if (updatedIngredient.affected === 0) {
        throw new BadRequestException('Cannot update ingredient');
      }

      return {
        isUpdated: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteIngredient(ingredientId: string): Promise<DeleteResponseDto> {
    try {
      const ingredient = await this.ingredientRepository.findOneBy({
        id: ingredientId,
      });
      if (!ingredient) {
        throw new BadRequestException('Ingredient not found');
      }

      const deletedIngredient =
        await this.ingredientRepository.softDelete(ingredientId);

      if (deletedIngredient.affected === 0) {
        throw new BadRequestException('Cannot delete ingredient');
      }

      return {
        isDeleted: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllIngredients(): Promise<IngredientResponseDto[]> {
    try {
      const ingredients = await this.ingredientRepository.find();
      return plainToInstance(IngredientResponseDto, ingredients);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getIngredientById(
    ingredientId: string,
  ): Promise<IngredientResponseDto> {
    try {
      const ingredient = await this.ingredientRepository.findOneBy({
        id: ingredientId,
      });
      if (!ingredient) {
        throw new BadRequestException('Ingredient not found');
      }
      return plainToInstance(IngredientResponseDto, ingredient);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
