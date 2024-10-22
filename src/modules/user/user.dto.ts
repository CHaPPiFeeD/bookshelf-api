import { IsEmail, IsString } from 'class-validator';


export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class GetUsersQueryDto {
  @IsString()
  @IsEmail()
  email: string;
}
