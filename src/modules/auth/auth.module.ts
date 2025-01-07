import { AuthConfig } from '@config';
import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthPasswordService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.AUTH_SERVICE,
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
  controllers: [AuthController],
  providers: [...Adapters, JwtStrategy],
  exports: [],
})
export class AuthModule {}
