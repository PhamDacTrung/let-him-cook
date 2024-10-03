import { UserResponseDto } from '../dtos';

export interface IUserService {
  getUserInfo(userId: string): Promise<UserResponseDto>;
}
