import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Dish extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  images: string[];

  @Column({ type: 'varchar', nullable: false, length: 10000 })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  user: User;

  @Column({ type: 'boolean', default: true })
  isVerified: boolean;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', name)",
    select: false,
    nullable: true,
  })
  @Index('dish_search_vector_idx', { synchronize: false })
  search_vector: string;
}
