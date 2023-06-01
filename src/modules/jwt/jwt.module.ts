import { Module } from '@nestjs/common';

import { JwtService } from './jwt.service';


@Module({
  imports: [],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
