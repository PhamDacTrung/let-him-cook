import { EnumInjectServiceToken } from '@common/enums';
import { Vote } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from './services/vote.service';

const Adapters = [
  {
    provide: EnumInjectServiceToken.VOTE_SERVICE,
    useClass: VoteService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class VoteModule {}
