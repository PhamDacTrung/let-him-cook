import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IngredientInputDto } from './dtos';
import { IngredientResponseDto } from './dtos/ingredient.response.dto';
import { IngredientService } from './ingredient.service';

@ApiTags('Ingredient')
@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async createIngredient(
    @Body() input: IngredientInputDto,
  ): Promise<IngredientResponseDto> {
    return this.ingredientService.createIngredient(input);
  }

  @Put(':ingredientId')
  async updateIngredient(
    @Param('ingredientId') ingredientId: string,
    @Body() input: IngredientInputDto,
  ): Promise<UpdateResponseDto> {
    return await this.ingredientService.updateIngredient(ingredientId, input);
  }

  @Delete(':ingredientId')
  async deleteIngredient(
    @Param('ingredientId') ingredientId: string,
  ): Promise<DeleteResponseDto> {
    return await this.ingredientService.deleteIngredient(ingredientId);
  }

  @Get()
  async getAllIngredients(): Promise<IngredientResponseDto[]> {
    return await this.ingredientService.getAllIngredients();
  }

  @Get(':ingredientId')
  async getIngredientById(
    @Param('ingredientId') ingredientId: string,
  ): Promise<IngredientResponseDto> {
    return await this.ingredientService.getIngredientById(ingredientId);
  }
}
