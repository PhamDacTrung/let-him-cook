import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'LetHimCook' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user01@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  @MinLength(8)
  password: string;
}
