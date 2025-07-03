import { ApiResponseWrapper } from '@common/decorators';
import { DeleteResponseDto, UpdateResponseDto } from '@common/dtos';
import {
  EnumInjectServiceToken,
  EnumRbacAction,
  EnumRbacResource,
} from '@common/enums';
import { JwtAuthGuard, RequirePermission } from '@modules/auth/guards';
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
import {
  IngredientInputDto,
  IngredientResponseDto,
  UpdateIngredientInputDto,
} from '../dtos';
import { IIngredientService } from '../interfaces';

@ApiTags('Ingredient')
@Controller('ingredients')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class IngredientController {
  constructor(
    @Inject(EnumInjectServiceToken.INGREDIENT_SERVICE)
    private readonly ingredientService: IIngredientService,
  ) {}

  @Post()
  @RequirePermission(EnumRbacAction.CREATE, {
    resourceType: EnumRbacResource.INGREDIENT,
  })
  @ApiResponseWrapper(IngredientResponseDto, 'Create ingredient')
  async createIngredient(
    @Body() input: IngredientInputDto,
  ): Promise<IngredientResponseDto> {
    return this.ingredientService.createIngredient(input);
  }

  @Put(':ingredientId')
  @RequirePermission(EnumRbacAction.UPDATE, {
    resourceType: EnumRbacResource.INGREDIENT,
  })
  @ApiResponseWrapper(UpdateResponseDto, 'Update ingredient')
  async updateIngredient(
    @Param('ingredientId') ingredientId: string,
    @Body() input: UpdateIngredientInputDto,
  ): Promise<UpdateResponseDto> {
    return await this.ingredientService.updateIngredient(ingredientId, input);
  }

  @Delete(':ingredientId')
  @RequirePermission(EnumRbacAction.DELETE, {
    resourceType: EnumRbacResource.INGREDIENT,
  })
  @ApiResponseWrapper(DeleteResponseDto, 'Delete ingredient')
  async deleteIngredient(
    @Param('ingredientId') ingredientId: string,
  ): Promise<DeleteResponseDto> {
    return await this.ingredientService.deleteIngredient(ingredientId);
  }

  @Get()
  @RequirePermission(EnumRbacAction.LIST, {
    resourceType: EnumRbacResource.INGREDIENT,
  })
  @ApiResponseWrapper(IngredientResponseDto, 'Get all ingredients')
  async getAllIngredients(): Promise<IngredientResponseDto[]> {
    return await this.ingredientService.getAllIngredients();
  }

  @Get(':ingredientId')
  @RequirePermission(EnumRbacAction.READ, {
    resourceType: EnumRbacResource.INGREDIENT,
  })
  @ApiResponseWrapper(IngredientResponseDto, 'Get ingredient by id')
  async getIngredientById(
    @Param('ingredientId') ingredientId: string,
  ): Promise<IngredientResponseDto> {
    return await this.ingredientService.getIngredientById(ingredientId);
  }
}
