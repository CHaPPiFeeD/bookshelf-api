import { AuthService } from '../services/auth.service';
import { SignUpBodyDto } from '../dto/sign-up.dto';
import { Controller, Inject, Post, Body, Query } from '@nestjs/common';
import { VerifyQueryDto } from '../dto/verify.dto';
import { SignInBodyDto } from '../dto/sign-in.dto';
import { SignInResponse } from '../types';


@Controller('/api/auth')
export class AuthController {
  @Inject(AuthService)
  private authService: AuthService;

  @Post('/sign-up')
  signUp(@Body() body: SignUpBodyDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/verify')
  verify(@Query() param: VerifyQueryDto): Promise<void> {
    return this.authService.verify(param);
  }

  @Post('/sign-in')
  signIn(@Body() body: SignInBodyDto): Promise<SignInResponse> {
    return this.authService.signIn(body);
  }
}
