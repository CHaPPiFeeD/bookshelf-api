import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

export class GetUsersQueryDto {
  @IsString()
  @IsEmail()
  email: string;
}
