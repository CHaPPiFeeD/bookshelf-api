import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { MailService } from '../mail/mail.service';
import { SignUpBodyDto } from './dto/sign-up.dto';
import { VerifyQueryDto } from './dto/verify.dto';
import { SignInBodyDto } from './dto/sign-in.dto';
import { RefreshTokenResType, SignInResType } from './types';
import { JwtService } from '../jwt/jwt.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateException } from '../../exceptions/exception';
import { API_ERROR_CODES } from '../../constants/error-codes';
import { UserRepository } from '../../repositories/user.repository';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';
import { InviteTokenPayloadType } from '../jwt/types';


@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  @Inject(MailService)
  private mailService: MailService;

  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  @InjectRepository(RefreshTokenRepository)
  private refreshTokenRepository: RefreshTokenRepository;

  @Inject(JwtService)
  private jwtService: JwtService;


  async signUp(body: SignUpBodyDto): Promise<void> {
    const { name, email, password } = body;

    const candidate = await this.userRepository.findOneBy({ email });
    if (candidate)
      throw new CreateException(API_ERROR_CODES.USER_ALREADY_REGISTERED);

    const hashedPassword = await bcrypt.hash(password, 8);

    const inviteToken = this.jwtService.generateInviteToken({ email });
    await this.mailService.sendMailConfirmation({ email, inviteToken });

    await this.userRepository.createUnverified({
      name,
      password: hashedPassword,
      email,
    });
  }

  async verify({ inviteToken }: VerifyQueryDto): Promise<void> {
    const { email }: InviteTokenPayloadType = this.jwtService.verifyToken(inviteToken);

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);

    await this.userRepository.confirmVerification({ userGuid: user.userGuid });
  }

  async signIn(body: SignInBodyDto): Promise<SignInResType> {
    const { email, password } = body;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);
    const { userGuid } = user;

    this.comparePassword(password, user.password);

    const accessToken = this.jwtService.generateAccessToken({ userGuid });
    const refreshToken = this.jwtService.generateRefreshToken({ userGuid });

    await this.refreshTokenRepository.updateOrCreateAndSave({ userGuid, refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<RefreshTokenResType> {
    await this.jwtService.verifyToken(refreshToken);

    const session = await this.refreshTokenRepository.findOne({
      where: { refreshToken },
      select: ['id', 'userGuid', 'expiresIn'],
    });
    if (!session) throw new CreateException(API_ERROR_CODES.SESSION_NOT_FOUND);
    await this.refreshTokenRepository.delete({ id: session.id });

    const { userGuid } = session;

    const newAccessToken = this.jwtService.generateAccessToken({ userGuid });
    const newRefreshToken = this.jwtService.generateRefreshToken({ userGuid });

    await this.refreshTokenRepository.update(
      { userGuid },
      { refreshToken: newRefreshToken }
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private async comparePassword(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isValidPassword = await bcrypt.compare(enteredPassword, hashedPassword);

    if (!isValidPassword)
      throw new CreateException(API_ERROR_CODES.USER_WRONG_PASSWORD);
  }
}
