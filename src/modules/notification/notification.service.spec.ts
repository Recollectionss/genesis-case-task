import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MAIL_TRANSPORTER } from './mail-transporter.providers';
import smtpConfig from '../../config/smtp.config';
import {
  ISendMail,
  TYPE_MAIL,
} from '../../shared/constants/mail.types.constants';
import { MAIL_DETAILS } from './constants/mail.details.constants';
import { InternalServerErrorException } from '@nestjs/common';
import { CityWeatherDto } from '../../shared/dto/city-weather.dto';
import { MailBuilderService } from './mail-builder/mail-builder.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const sendMailMock = jest.fn();

  const mockTransporter = {
    sendMail: sendMailMock,
  };

  const mockSmtpConfig = {
    user: 'noreply@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        MailBuilderService,
        {
          provide: MAIL_TRANSPORTER,
          useValue: mockTransporter,
        },
        {
          provide: smtpConfig.KEY,
          useValue: mockSmtpConfig,
        },
      ],
    }).compile();

    service = module.get(NotificationService);
    sendMailMock.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const baseMailDto: ISendMail = {
    to: 'test@example.com',
    city: 'Kyiv',
    token: 'test_token',
    type: TYPE_MAIL.SUBSCRIBE,
  };

  it(`should send  subscribe mail type `, async () => {
    sendMailMock.mockResolvedValue(true);
    const result = await service.sendSubscribeMail(baseMailDto);

    expect(result).toBe(undefined);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: mockSmtpConfig.user,
        to: baseMailDto.to,
        subject: MAIL_DETAILS[TYPE_MAIL.SUBSCRIBE].subject + baseMailDto.city,
        text: MAIL_DETAILS[TYPE_MAIL.SUBSCRIBE].text + baseMailDto.token,
      }),
    );
  });

  const weatherNotificationMail: CityWeatherDto[] = [
    {
      city: 'Kyiv',
      token: 'confirmationToken',
      temperature: 10,
      humidity: 10,
      description: 'description',
    },
  ];

  it(`should send  weather notification mail type `, async () => {
    sendMailMock.mockResolvedValue(true);
    const result = await service.sendNotificationMail(
      'test@example.com',
      weatherNotificationMail,
    );
    const weather = weatherNotificationMail[0];

    expect(result).toBe(undefined);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: mockSmtpConfig.user,
        to: baseMailDto.to,
        subject: MAIL_DETAILS.weather_notification.subject,
        text: `City: ${weather.city}
Temperature: ${weather.temperature}
Humidity: ${weather.humidity}
Description: ${weather.description}
Unsubscribe: http://localhost:5010/unsubscribe/${weather.token}`,
      }),
    );
  });

  it('should throw InternalServerErrorException if transporter fails', async () => {
    sendMailMock.mockRejectedValue(new Error('SMTP error'));

    await expect(service.sendSubscribeMail(baseMailDto)).rejects.toThrow(
      InternalServerErrorException,
    );

    expect(sendMailMock).toHaveBeenCalled();
  });
});
