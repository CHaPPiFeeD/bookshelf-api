import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SendConfirmationMail } from '../types';


@Injectable()
export class MailService {
  @Inject(MailerService)
  private mailerService: MailerService;

  @Inject(ConfigService)
  private configService: ConfigService;
  

  sendMailConfirmation({ email, inviteToken }: SendConfirmationMail) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'MAIL CONFIRMATION',
      template: './confirmation',
      context: {
        url: `${this.configService.get('client.host')}/?inviteToken=${inviteToken}`,
      },
    });
  }
}
