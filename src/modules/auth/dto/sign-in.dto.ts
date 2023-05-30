import { IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class SignInBodyDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
