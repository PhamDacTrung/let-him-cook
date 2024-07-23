import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterResponseDto {
  @Expose()
  createdAt: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
