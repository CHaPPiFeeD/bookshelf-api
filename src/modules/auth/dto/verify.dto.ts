import { IsNotEmpty } from 'class-validator';


export class VerifyQueryDto {
  @IsNotEmpty()
  token: string;
}
