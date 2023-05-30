import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../../../entities/user.entity';
import { MailService } from '../../mail/services/mail.service';
import { SignUpBodyDto } from '../dto/sign-up.dto';
import { VerifyQueryDto } from '../dto/verify.dto';
import { SignInBodyDto } from '../dto/sign-in.dto';
import { InviteTokenType, SignInResponseType } from '../types';
import { JwtService } from '../../jwt/services/jwt.service';
import { RefreshToken } from 'src/entities/refresh-token.entity';


@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(MailService)
  private mailService: MailService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(RefreshToken)
  private refreshTokenRepository: Repository<RefreshToken>;

  @Inject(JwtService)
  private jwtService: JwtService;


  async signUp(body: SignUpBodyDto): Promise<void> {
    const foundUser = await this.userRepository.findOneBy({ email: body.email });
    if (foundUser) throw new HttpException('User already created', 400);

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

  async verify({ token }: VerifyQueryDto): Promise<void> {
    const { email }: InviteTokenType = this.jwtService.verifyToken(token);

    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new HttpException('User not found', 404);

    await this.userRepository.update(
      { userGuid: user.userGuid },
      { isVerified: true }
    );
  }

  async signIn(body: SignInBodyDto): Promise<SignInResponseType> {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) throw new HttpException('User not found', 400);

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) throw new HttpException('User wrong password', 400);

    const accessToken = this.jwtService.generateAccessToken({
      userGuid: user.userGuid,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      userGuid: user.userGuid,
    });

    await this.refreshTokenRepository.create({
      userGuid: user.userGuid,
      refreshToken,
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken, refreshToken };
  }
}
