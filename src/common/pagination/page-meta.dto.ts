import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PageMetaDto {
  constructor({
    page,
    take,
    itemCount,
    recommendBegin,
  }: {
    page: number;
    take: number;
    itemCount: number;
    recommendBegin?: number | undefined;
  }) {
    this.page = page;
    this.take = take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;

    if (recommendBegin !== undefined) {
      this.recommendBegin = recommendBegin;
    } else {
      this.recommendBegin = null;
    }
  }

  @Expose()
  @IsNumber()
  page: number;

  @Expose()
  @IsNumber()
  take: number;

  @Expose()
  @IsNumber()
  itemCount: number;

  @Expose()
  @IsNumber()
  pageCount: number;

  @Expose()
  @IsBoolean()
  hasPreviousPage: boolean;

  @Expose()
  @IsBoolean()
  hasNextPage: boolean;

  @Expose()
  @IsNumber()
  @IsOptional()
  recommendBegin: number | null;
}
