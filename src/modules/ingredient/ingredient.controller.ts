import { Roles } from '@decorators';
import { DeleteResponseDto, UpdateResponseDto } from '@dtos';
import { INJECTION_SERVICE_TOKEN, UserRole } from '@enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import {
  IngredientInputDto,
  IngredientResponseDto,
  UpdateIngredientInputDto,
} from './dtos';
import { IIngredientService } from './interfaces';

@ApiTags('Ingredient')
@Controller('ingredients')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class IngredientController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.INGREDIENT_SERVICE)
    private readonly ingredientService: IIngredientService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async createIngredient(
    @Body() input: IngredientInputDto,
  ): Promise<IngredientResponseDto> {
    return this.ingredientService.createIngredient(input);
  }

  @Put(':ingredientId')
  @Roles(UserRole.ADMIN)
  async updateIngredient(
    @Param('ingredientId') ingredientId: string,
    @Body() input: UpdateIngredientInputDto,
  ): Promise<UpdateResponseDto> {
    return await this.ingredientService.updateIngredient(ingredientId, input);
  }

  @Delete(':ingredientId')
  @Roles(UserRole.ADMIN)
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
