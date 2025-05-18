import { Inject, Injectable } from '@nestjs/common';
import smtpConfig from '../../../config/smtp.config';
import { ConfigType } from '@nestjs/config';
import { Mail } from '../types/mail.type';
import { MAIL_DETAILS } from '../constants/mail.details.constants';
import { CityWeatherDto } from '../../weather-api/dto/city-weather.dto';

@Injectable()
export class MailBuilderService {
  private mailText: Mail;
  constructor(
    @Inject(smtpConfig.KEY)
    private readonly smtpConf: ConfigType<typeof smtpConfig>,
  ) {
    this.base();
  }

  to(email: string): MailBuilderService {
    this.mailText.to = email;
    return this;
  }

  mailSubscribe(city: string, token: string): MailBuilderService {
    this.mailText.subject = MAIL_DETAILS.subscribe.subject + city;
    this.mailText.text = MAIL_DETAILS.subscribe.text + token;
    return this;
  }

  mailCurrentWeather(weatherData: CityWeatherDto[]): MailBuilderService {
    this.mailText.subject = MAIL_DETAILS.weather_notification.subject;

    this.mailText.text = weatherData
      .map((data) => {
        const weatherInfo = `City: ${data.city}
Temperature: ${data.temperature}
Humidity: ${data.humidity}
Description: ${data.description}`;

        const unsubscribeLink = `Unsubscribe: http://localhost:5010/unsubscribe/${data.token}`;

        return `${weatherInfo}\n${unsubscribeLink}`;
      })
      .join('\n\n');

    return this;
  }

  build(): Mail {
    const result: Mail = this.mailText;
    this.base();
    return result;
  }

  private base(): void {
    this.mailText = {
      from: this.smtpConf.user,
    } as Mail;
    return;
  }
}
