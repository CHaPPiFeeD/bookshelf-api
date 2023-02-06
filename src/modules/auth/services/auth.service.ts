import { HttpException, Logger } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { MailService } from 'src/modules/mail/services/mail.service';
import { SignUpBodyDto } from '../dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { VerifyQueryDto } from '../dto/verify.dto';
import { SignInBodyDto } from '../dto/sign-in.dto';
import { SignInResponse } from '../types';


@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(MailService)
  private mailService: MailService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async signUp(body: SignUpBodyDto): Promise<void> {
    const foundUser = await this.userRepository.findOneBy({ email: body.email });
    if (foundUser) throw new HttpException('User already created', 400);

    const password = await bcrypt.hash(body.password, 8);
    const confirmToken = jwt.sign({ email: body.email }, this.configService.get('jwt.secret'));

    await this.mailService.sendMailConfirmation(body.email, {
      url: `${this.configService.get('client.host')}/?token=${confirmToken}`,
    });

    const payment = this.userRepository.create({ name: body.name, password, email: body.email });
    this.userRepository.save(payment);
  }

  async verify(params: VerifyQueryDto): Promise<void> {
    const payload = jwt.verify(params.token, this.configService.get('jwt.secret'));
    if (!payload) throw new HttpException('Token is invalid or expired', 400);

    const user = await this.userRepository.findOneBy({ email: payload.email });
    if (!user) throw new HttpException('User not found', 400);

    await this.userRepository.update({ userGuid: user.userGuid }, { isVerified: true });
  }

  async signIn(body: SignInBodyDto): Promise<SignInResponse> {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) throw new HttpException('User not found', 400);

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) throw new HttpException('User wrong password', 400);

    const accessToken = jwt.sign({ guid: user.userGuid }, this.configService.get('jwt.secret'));
    return { accessToken };
  }
}
