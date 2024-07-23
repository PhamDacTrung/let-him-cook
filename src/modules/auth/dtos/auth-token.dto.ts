import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthTokenDto {
  @Expose()
  accessToken: string;
}
