import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  @Inject(MailerService)
  private mailerService: MailerService;

  sendMailConfirmation(email: string, context: { url: string }) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'MAIL CONFIRMATION',
      template: './confirmation',
      context: {
        url: context.url,
      },
    });
  }
}
