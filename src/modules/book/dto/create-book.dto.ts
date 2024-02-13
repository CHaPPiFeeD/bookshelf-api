import { IsDefined, IsString } from 'class-validator';


export class CreateBookDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;
}
