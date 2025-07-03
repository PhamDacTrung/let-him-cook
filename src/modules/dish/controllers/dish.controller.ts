import { ApiResponseWrapper, CurrentUser } from '@common/decorators';
import { DeleteResponseDto, UpdateResponseDto } from '@common/dtos';
import {
  EnumInjectServiceToken,
  EnumRbacAction,
  EnumRbacResource,
} from '@common/enums';
import { PageDto, PageOptionsDto } from '@common/pagination';
import { User } from '@entities';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DishInputDto, DishResponseDto, FilterDishesDto } from '../dtos';
import { IDishService } from '../interfaces';

@ApiTags('Dish')
@Controller('dishes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class DishController {
  constructor(
    @Inject(EnumInjectServiceToken.DISH_SERVICE)
    private readonly dishService: IDishService,
  ) {}

  @Post()
  @RequirePermission(EnumRbacAction.CREATE, {
    resourceType: EnumRbacResource.DISH,
  })
  @ApiResponseWrapper(DishResponseDto, 'Create dish')
  async createDish(
    @CurrentUser() user: User,
    @Body() input: DishInputDto,
  ): Promise<DishResponseDto> {
    return await this.dishService.createDish(user.id, input);
  }

  @Get()
  @RequirePermission(EnumRbacAction.LIST, {
    resourceType: EnumRbacResource.DISH,
  })
  @ApiResponseWrapper(DishResponseDto, 'Get dishes')
  async getDishes(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filters: FilterDishesDto,
  ): Promise<PageDto<DishResponseDto>> {
    return await this.dishService.getDishes(pageOptionsDto, filters);
  }

  @Get(':dishId')
  @RequirePermission(EnumRbacAction.READ, {
    resourceType: EnumRbacResource.DISH,
  })
  @ApiResponseWrapper(DishResponseDto, 'Get dish by id')
  async getDish(@Param('dishId') dishId: string): Promise<DishResponseDto> {
    return await this.dishService.getDish(dishId);
  }

  @Put(':dishId')
  @RequirePermission(EnumRbacAction.UPDATE, {
    resourceType: EnumRbacResource.DISH,
  })
  @ApiResponseWrapper(DishResponseDto, 'Update dish')
  async updateDish(
    @Param('dishId') dishId: string,
    @Body() input: DishInputDto,
  ): Promise<UpdateResponseDto> {
    return await this.dishService.updateDish(dishId, input);
  }

  @Delete(':dishId')
  @RequirePermission(EnumRbacAction.DELETE, {
    resourceType: EnumRbacResource.DISH,
  })
  @ApiResponseWrapper(DeleteResponseDto, 'Delete dish')
  async deleteDish(
    @Param('dishId') dishId: string,
  ): Promise<DeleteResponseDto> {
    return await this.dishService.deleteDish(dishId);
  }
}
