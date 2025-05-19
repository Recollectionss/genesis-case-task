import { Test, TestingModule } from '@nestjs/testing';
import { MailBuilderService } from './mail-builder.service';
import { ConfigType } from '@nestjs/config';
import smtpConfig from '../../../config/smtp.config';
import { MAIL_DETAILS } from '../constants/mail.details.constants';
import { CityWeatherDto } from '../../../shared/dto/city-weather.dto';

describe('MailBuilderService', () => {
  let service: MailBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailBuilderService,
        {
          provide: smtpConfig.KEY,
          useValue: {
            user: 'test@example.com',
          } as ConfigType<typeof smtpConfig>,
        },
      ],
    }).compile();

    service = module.get(MailBuilderService);
  });

  it('should build a subscribe mail correctly', () => {
    const city = 'Kyiv';
    const token = 'test-token';
    const email = 'user@example.com';

    const mail = service.to(email).mailSubscribe(city, token).build();

    expect(mail.to).toBe(email);
    expect(mail.from).toBe('test@example.com');
    expect(mail.subject).toBe(MAIL_DETAILS.subscribe.subject + city);
    expect(mail.text).toContain(token);
  });

  it('should build a weather notification mail correctly', () => {
    const weatherData: CityWeatherDto[] = [
      {
        city: 'Kyiv',
        temperature: 22,
        humidity: 60,
        description: 'Clear sky',
        token: 'abc123',
      },
    ];

    const mail = service
      .to('user@example.com')
      .mailCurrentWeather(weatherData)
      .build();

    expect(mail.subject).toBe(MAIL_DETAILS.weather_notification.subject);
    expect(mail.text).toContain('City: Kyiv');
    expect(mail.text).toContain('Temperature: 22');
    expect(mail.text).toContain('Humidity: 60');
    expect(mail.text).toContain('Clear sky');
    expect(mail.text).toContain('http://localhost:5010/unsubscribe/abc123');
  });
});
