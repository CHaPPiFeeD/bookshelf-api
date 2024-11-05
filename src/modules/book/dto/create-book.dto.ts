import { IsDefined, IsString, MinLength } from 'class-validator';


export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MinLength(3)
  name: string;

  @IsString()
  @IsDefined()
  description: string;
}
