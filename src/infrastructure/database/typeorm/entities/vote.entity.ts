import { BaseEntity, Dish, User } from '@entities';
import { Max, Min } from 'class-validator';
import { Check, Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity()
@Unique(['user', 'dish'])
@Check(`"rating" >= 1 AND "rating" <= 5`)
export class Vote extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  dishId: string;

  @ManyToOne(() => Dish, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @Column({ type: 'smallint', nullable: false })
  @Min(1)
  @Max(5)
  rating: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  comment: string;
}
