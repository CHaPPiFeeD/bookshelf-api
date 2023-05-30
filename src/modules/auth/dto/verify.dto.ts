import { IsNotEmpty } from 'class-validator';


export class VerifyQueryDto {
  @IsNotEmpty()
  inviteToken: string;
}
