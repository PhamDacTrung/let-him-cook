import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from '../dtos';

export interface IAuthService {
  register(input: RegisterInputDto): Promise<RegisterResponseDto>;
  login(input: LoginInputDto): Promise<AuthTokenDto>;
}
