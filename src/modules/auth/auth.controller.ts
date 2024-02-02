import { Controller, Inject, Post, Body, UseGuards, Put } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dto/sign-up.dto';
import { VerifyQueryDto } from './dto/verify.dto';
import { SignInBodyDto, SignInResponse } from './dto/sign-in.dto';
import { RefreshTokenDto, RefreshTokenResponse } from './dto/refresh-token.dto';
import { RefreshTokenResType, SignInResType } from './types';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { API_ERROR_CODES_MESSAGES } from 'src/constants/error-codes';
import { AuthGuard } from 'src/guards/auth.guard';


@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  @Inject(AuthService)
  private authService: AuthService;

  @ApiResponse({ status: 201, description: 'ok' })
  @ApiResponse({ status: 409, description: API_ERROR_CODES_MESSAGES.USER_ALREADY_REGISTERED })
  @Post('/sign-up')
  signUp(@Body() body: SignUpBodyDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 404, description: API_ERROR_CODES_MESSAGES.USER_NOT_FOUND })
  @Put('/verify')
  verify(@Body() param: VerifyQueryDto): Promise<void> {
    return this.authService.verify(param);
  }

  @ApiExtraModels(SignInResponse)
  @ApiResponse({
    status: 201,
    description: 'ok',
    schema: {
      $ref: getSchemaPath(SignInResponse),
    },
  })
  @ApiResponse({ status: 404, description: API_ERROR_CODES_MESSAGES.USER_NOT_FOUND })
  @Post('/sign-in')
  signIn(@Body() body: SignInBodyDto): Promise<SignInResType> {
    return this.authService.signIn(body);
  }

  @ApiBearerAuth()
  @ApiExtraModels(RefreshTokenResponse)
  @ApiResponse({
    status: 200,
    description: 'ok',
    schema: {
      $ref: getSchemaPath(RefreshTokenResponse),
    },
  })
  @ApiResponse({ status: 401, description: API_ERROR_CODES_MESSAGES.SESSION_NOT_FOUND })
  @UseGuards(AuthGuard)
  @Post('/refresh-token')
  refreshToken(@Body() body: RefreshTokenDto): Promise<RefreshTokenResType> {
    return this.authService.refreshToken(body);
  }
}
