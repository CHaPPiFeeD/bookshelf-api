import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token of user.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
