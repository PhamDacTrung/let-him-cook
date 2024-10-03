import { Vote } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from './services/vote.service';
import { VoteController } from './vote.controller';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.VOTE_SERVICE,
    useClass: VoteService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [VoteController],
  providers: [...Adapters],
})
export class VoteModule {}
