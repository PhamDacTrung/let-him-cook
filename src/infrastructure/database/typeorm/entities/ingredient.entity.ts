import { EnumTypeOfFood } from '@common/enums';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'enum', enum: EnumTypeOfFood })
  type: EnumTypeOfFood;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', name)",
    select: false,
    nullable: true,
  })
  @Index('ingredient_search_vector_idx', { synchronize: false })
  search_vector: string;
}
