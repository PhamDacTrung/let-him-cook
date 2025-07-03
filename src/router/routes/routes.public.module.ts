// Use this route for public services
// such as: login, register, etc.

import { AuthModule } from '@modules/auth/auth.module';
import { AuthController } from '@modules/auth/controllers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
  imports: [AuthModule],
})
export class RoutesPublicModule {}
