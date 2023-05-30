import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';


export class SignUpBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  @Matches(/^((?![^\w\s]).)*$/)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
