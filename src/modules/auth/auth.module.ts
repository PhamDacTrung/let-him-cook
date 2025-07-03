import { AuthConfig } from '@config';
import { User } from '@entities';

import { EnumInjectServiceToken } from '@common/enums';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPasswordService } from './services/auth.service';
import { RbacService } from './services/rbac.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const Adapters = [
  {
    provide: EnumInjectServiceToken.AUTH_SERVICE,
    useClass: AuthPasswordService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      inject: [AuthConfig.KEY],
      useFactory: (authConfig: ConfigType<typeof AuthConfig>) => {
        const { jwtSecret, accessTokenExpiration } = authConfig;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: parseInt(accessTokenExpiration, 10),
          },
        };
      },
    }),
  ],
  providers: [...Adapters, JwtStrategy, RbacService],
  exports: [...Adapters, RbacService],
})
export class AuthModule {}
