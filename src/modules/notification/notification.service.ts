import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import smtpConfig from '../../config/smtp.config';
import { ConfigType } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { ISendMail } from '../../constants/mail.types.constants';
import { MAIL_DETAILS } from './constants/mail.details.constants';
import { MAIL_TRANSPORTER } from './mail-transporter.providers';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    @Inject(smtpConfig.KEY)
    private readonly smtpConf: ConfigType<typeof smtpConfig>,
  ) {}

  async sendMail(data: ISendMail) {
    try {
      const mailData = this.buildMail(data);
      await this.transporter.sendMail(mailData);
    } catch (err) {
      this.logger.error('Error', err);
      throw new InternalServerErrorException(err.message);
    }
  }

  private buildMail(data: ISendMail) {
    return {
      from: this.smtpConf.user,
      to: data.to,
      subject: MAIL_DETAILS[data.type].subject + data.city,
      text: MAIL_DETAILS[data.type].text + data.token,
    };
  }
}
