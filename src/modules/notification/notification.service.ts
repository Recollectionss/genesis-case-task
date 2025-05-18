import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { ISendMail } from '../../constants/mail.types.constants';
import { MAIL_TRANSPORTER } from './mail-transporter.providers';
import { MailBuilderService } from './mail-builder/mail-builder.service';
import { Mail } from './types/mail.type';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    private readonly mailBuilderService: MailBuilderService,
  ) {}

  async sendSubscribeMail(data: ISendMail): Promise<void> {
    try {
      const mailData: Mail = this.buildSubscribeMail(data);
      await this.transporter.sendMail(mailData);
      return;
    } catch (err) {
      this.logger.error('Error', err);
      throw new InternalServerErrorException(err.message);
    }
  }

  private buildSubscribeMail(data: ISendMail): Mail {
    return this.mailBuilderService
      .to(data.to)
      .mailSubscribe(data.city, data.token)
      .build();
  }
}
