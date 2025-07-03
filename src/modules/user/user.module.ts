import { EnumInjectServiceToken } from '@common/enums';
import { User } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';

const Adapters = [
  {
    provide: EnumInjectServiceToken.USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class UserModule {}
