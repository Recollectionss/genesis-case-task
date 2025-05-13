import { ConfigType } from '@nestjs/config';
import { FactoryProvider } from '@nestjs/common';
import smtpConfig from '../../config/smtp.config';
import * as nodemailer from 'nodemailer';

export const MAIL_TRANSPORTER = 'MAIL_TRANSPORTER';

export const TRANSPORTER: FactoryProvider = {
  provide: MAIL_TRANSPORTER,
  inject: [smtpConfig.KEY],
  useFactory: async (smtpConf: ConfigType<typeof smtpConfig>) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: smtpConf.host,
      port: smtpConf.port,
      secure: false,
      auth: {
        user: smtpConf.user,
        pass: smtpConf.pass,
      },
    });
    await transporter.verify();
    return transporter;
  },
};
