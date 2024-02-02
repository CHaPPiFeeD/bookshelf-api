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
import { InviteTokenPayloadType } from '../jwt/types';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/entities/refresh-token.entity';


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
    const { name, email, password } = body;

    const candidate = await this.userRepository.findOneBy({ email });
    if (candidate)
      throw new CreateException(API_ERROR_CODES.USER_ALREADY_REGISTERED);

    const hashedPassword = await bcrypt.hash(password, 8);

    const inviteToken = this.jwtService.generateInviteToken({ email });
    await this.mailService.sendMailConfirmation({ email, inviteToken });

    const entity = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isBanned: false,
      isVerified: false,
    });

    await this.userRepository.save(entity);
  }

  async verify({ inviteToken }: VerifyQueryDto): Promise<void> {
    const { email }: InviteTokenPayloadType = this.jwtService.verifyToken(inviteToken);

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);

    await this.userRepository.update({ userGuid: user.userGuid }, { isVerified: true });
  }

  async signIn(body: SignInBodyDto): Promise<SignInResType> {
    const { email, password } = body;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);

    const { userGuid } = user;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new CreateException(API_ERROR_CODES.USER_WRONG_PASSWORD);

    const accessToken = this.jwtService.generateAccessToken({ userGuid });
    const refreshToken = this.jwtService.generateRefreshToken({ userGuid });

    const isDefined = await this.refreshTokenRepository.findOneBy({ userGuid });
    if (isDefined) {
      await this.refreshTokenRepository.update({ userGuid }, { refreshToken });
    } else {
      const refreshTokenData = this.refreshTokenRepository.create({ userGuid, refreshToken });
      const isCreated = await this.refreshTokenRepository.save(refreshTokenData);
      if (!isCreated) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);
    }

    return { accessToken, refreshToken };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<RefreshTokenResType> {
    await this.jwtService.verifyToken(refreshToken);

    const session = await this.refreshTokenRepository.findOne({
      where: { refreshToken },
      select: ['id', 'userGuid'],
    });
    if (!session) throw new CreateException(API_ERROR_CODES.SESSION_NOT_FOUND);

    const { userGuid } = session;

    const newAccessToken = this.jwtService.generateAccessToken({ userGuid });
    const newRefreshToken = this.jwtService.generateRefreshToken({ userGuid });

    await this.refreshTokenRepository.update(
      { userGuid },
      { refreshToken: newRefreshToken }
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
