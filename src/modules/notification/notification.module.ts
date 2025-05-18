import { Module, Scope } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import smtpConfig from '../../config/smtp.config';
import { TRANSPORTER } from './mail-transporter.providers';
import { MailBuilderService } from './mail-builder/mail-builder.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [smtpConfig] })],
  providers: [
    NotificationService,
    TRANSPORTER,
    {
      provide: MailBuilderService,
      useValue: MailBuilderService,
      scope: Scope.TRANSIENT,
    },
  ],
})
export class NotificationModule {}
