import { Dish } from '@entities';
import { Taste } from '@enums';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['dishId', 'taste'])
export class DishTaste extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  dishId: string;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @Column()
  taste: Taste;
}
