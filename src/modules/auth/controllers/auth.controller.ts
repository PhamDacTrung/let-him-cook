import { ApiResponseWrapper } from '@common/decorators';
import { EnumInjectServiceToken } from '@common/enums';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from '../dtos';
import { IAuthService } from '../interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(EnumInjectServiceToken.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @ApiResponseWrapper(RegisterResponseDto, 'Register')
  register(@Body() input: RegisterInputDto): Promise<RegisterResponseDto> {
    return this.authService.register(input);
  }

  @Post('login')
  @ApiResponseWrapper(AuthTokenDto, 'Login')
  login(@Body() input: LoginInputDto): Promise<AuthTokenDto> {
    return this.authService.login(input);
  }
}
