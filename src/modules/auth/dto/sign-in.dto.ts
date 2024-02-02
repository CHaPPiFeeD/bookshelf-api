import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class SignInBodyDto {
  @ApiProperty({
    description: 'The email of user.',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: 'The password of user.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
