import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class VerifyQueryDto {
  @ApiProperty({
    description: 'The invite token of user.',
    required: true,
  })
  @IsNotEmpty()
  inviteToken: string;
}
