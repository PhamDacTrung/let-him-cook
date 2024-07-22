import { TypeOfFood } from '@enums';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'enum', enum: TypeOfFood })
  type: TypeOfFood;
}
