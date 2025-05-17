import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import smtpConfig from '../../config/smtp.config';
import { TRANSPORTER } from './mail-transporter.providers';

@Module({
  imports: [ConfigModule.forRoot({ load: [smtpConfig] })],
  providers: [NotificationService, TRANSPORTER],
  exports: [NotificationService],
})
export class NotificationModule {}
