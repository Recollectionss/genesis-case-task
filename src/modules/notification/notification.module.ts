import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TRANSPORTER } from './mail-transporter';
import { ConfigModule } from '@nestjs/config';
import smtpConfig from '../../config/smtp.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [smtpConfig] })],
  providers: [NotificationService, TRANSPORTER],
})
export class NotificationModule {}
