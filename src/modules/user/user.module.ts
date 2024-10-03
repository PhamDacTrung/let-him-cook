import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { UserController } from './user.controller';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [...Adapters],
})
export class UserModule {}
