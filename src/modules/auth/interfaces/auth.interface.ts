import { User } from '@entities';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from '../dtos';

export interface IAuthService {
  register(input: RegisterInputDto): Promise<RegisterResponseDto>;
  login(input: LoginInputDto): Promise<AuthTokenDto>;
  validateUserById(userId: string): Promise<User>;
}
