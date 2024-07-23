import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() input: RegisterInputDto): Promise<RegisterResponseDto> {
    return this.authService.register(input);
  }

  @Post('login')
  login(@Body() input: LoginInputDto): Promise<AuthTokenDto> {
    return this.authService.login(input);
  }
}
