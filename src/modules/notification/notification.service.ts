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
import { CityWeatherDto } from '../weather-api/dto/city-weather.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    private readonly mailBuilderService: MailBuilderService,
  ) {}

  async sendSubscribeMail(data: ISendMail): Promise<void> {
    const mailData: Mail = this.buildSubscribeMail(data);
    await this.send(mailData);
  }

  async sendNotificationMail(email: string, weatherList: CityWeatherDto[]) {
    const mailData: Mail = this.buildNotificationMail(email, weatherList);
    await this.send(mailData);
  }

  private buildSubscribeMail(data: ISendMail): Mail {
    return this.mailBuilderService
      .to(data.to)
      .mailSubscribe(data.city, data.token)
      .build();
  }

  private buildNotificationMail(
    email: string,
    weatherList: CityWeatherDto[],
  ): Mail {
    return this.mailBuilderService
      .to(email)
      .mailCurrentWeather(weatherList)
      .build();
  }

  private async send(mail: Mail): Promise<void> {
    try {
      await this.transporter.sendMail(mail);
      return;
    } catch (err) {
      this.logger.error('Error', err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
