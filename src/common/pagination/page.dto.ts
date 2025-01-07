import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto<T> {
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }

  @IsArray()
  data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
