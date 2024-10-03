import { INJECTION_SERVICE_TOKEN } from '@enums';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from './dtos';
import { IAuthService } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @Post('register')
  register(@Body() input: RegisterInputDto): Promise<RegisterResponseDto> {
    return this.authService.register(input);
  }

  @Post('login')
  login(@Body() input: LoginInputDto): Promise<AuthTokenDto> {
    return this.authService.login(input);
  }
}
