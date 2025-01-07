import { User } from '@entities';
import { INJECTION_SERVICE_TOKEN } from '@enums';
import { AuthPayload } from '@interfaces';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig } from 'src/config';
import { IAuthService } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,

    @Inject(INJECTION_SERVICE_TOKEN.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthPayload): Promise<User> {
    if (!payload) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id: userId } = payload;
    const user = await this.authService.validateUserById(userId);

    return user;
  }
}
