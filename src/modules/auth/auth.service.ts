import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { MailService } from '../mail/mail.service';
import { SignUpBodyDto } from './dto/sign-up.dto';
import { VerifyQueryDto } from './dto/verify.dto';
import { SignInBodyDto } from './dto/sign-in.dto';
import { InviteTokenType, RefreshTokenResType, SignInResType } from './types';
import { JwtService } from '../jwt/jwt.service';
import { RefreshToken } from '../../entities/refresh-token.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateException } from '../../exceptions/exception';
import { API_ERROR_CODES } from '../../constants/error-codes';


@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  @Inject(MailService)
  private mailService: MailService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(RefreshToken)
  private refreshTokenRepository: Repository<RefreshToken>;

  @Inject(JwtService)
  private jwtService: JwtService;


  async signUp(body: SignUpBodyDto): Promise<void> {
    const candidate = await this.userRepository.findOneBy({ email: body.email });
    if (candidate)
      throw new CreateException(API_ERROR_CODES.USER_ALREADY_REGISTERED);

    const password = await bcrypt.hash(body.password, 8);

    const inviteToken = this.jwtService.generateInviteToken({
      email: body.email,
    });

    await this.mailService.sendMailConfirmation({
      email: body.email,
      inviteToken,
    });

    const user = this.userRepository.create({
      name: body.name,
      password,
      email: body.email,
    });

    this.userRepository.save(user);
  }

  async verify({ inviteToken }: VerifyQueryDto): Promise<void> {
    const { email }: InviteTokenType = this.jwtService.verifyToken(inviteToken);

    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);

    await this.userRepository.update(
      { userGuid: user.userGuid },
      { isVerified: true }
    );
  }

  async signIn(body: SignInBodyDto): Promise<SignInResType> {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword)
      throw new CreateException(API_ERROR_CODES.USER_WRONG_PASSWORD);

    const accessToken = this.jwtService.generateAccessToken({
      userGuid: user.userGuid,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      userGuid: user.userGuid,
    });

    const refreshTokenPayment = await this.refreshTokenRepository.create({
      userGuid: user.userGuid,
      refreshToken,
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });

    await this.refreshTokenRepository.save(refreshTokenPayment);

    return { accessToken, refreshToken };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<RefreshTokenResType> {
    const session = await this.refreshTokenRepository.findOne({
      where: {
        refreshToken,
      },
      select: ['id', 'userGuid', 'expiresIn'],
    });
    if (!session) throw new CreateException(API_ERROR_CODES.SESSION_NOT_FOUND);
    await this.refreshTokenRepository.delete({ id: session.id });

    await this.jwtService.verifyToken(refreshToken);

    const newAccessToken = this.jwtService.generateAccessToken({
      userGuid: session.userGuid,
    });

    const newRefreshToken = this.jwtService.generateRefreshToken({
      userGuid: session.userGuid,
    });

    const refreshTokenPayment = await this.refreshTokenRepository.create({
      userGuid: session.userGuid,
      refreshToken: newRefreshToken,
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });

    await this.refreshTokenRepository.save(refreshTokenPayment);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
