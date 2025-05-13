import { Inject, Injectable } from '@nestjs/common';
import { MAIL_TRANSPORTER } from './mail-transporter';
import smtpConfig from '../../config/smtp.config';
import { ConfigType } from '@nestjs/config';
import { Transporter } from 'nodemailer';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    @Inject(smtpConfig.KEY)
    private readonly smtpConf: ConfigType<typeof smtpConfig>,
  ) {}
}
