import { BaseEntity, Dish, Ingredient } from '@entities';
import { UnitOfMeasurement } from '@enums';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class DishIngredient extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  dishId: string;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @Column({ type: 'uuid', nullable: false })
  ingredientId: string;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column({ type: 'smallint', nullable: false })
  quantity: number;

  @Column({ type: 'enum', enum: UnitOfMeasurement, nullable: false })
  unit: UnitOfMeasurement;
}
