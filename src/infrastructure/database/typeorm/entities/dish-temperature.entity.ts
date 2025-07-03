import { Dish } from '@entities';

import { EnumTemperature } from '@common/enums';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['dishId', 'temperature'])
export class DishTemperature extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  dishId: string;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @Column()
  temperature: EnumTemperature;
}
