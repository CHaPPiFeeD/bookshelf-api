import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';


export class SignUpBodyDto {
  @ApiProperty({
    description: 'The name of user.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  @Matches(/^((?![^\w\s]).)*$/)
  name: string;

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
