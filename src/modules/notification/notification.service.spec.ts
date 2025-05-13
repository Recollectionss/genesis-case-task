import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MAIL_TRANSPORTER } from './mail-transporter.providers';
import smtpConfig from '../../config/smtp.config';
import { ISendMail, TYPE_MAIL } from '../../constants/mail.types.constants';
import { MAIL_DETAILS } from './constants/mail.details.constants';
import { InternalServerErrorException } from '@nestjs/common';

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

  it.each([[TYPE_MAIL.SUBSCRIBE], [TYPE_MAIL.UNSUBSCRIBE]])(
    `should send mail type ${baseMailDto.type}`,
    async (type) => {
      sendMailMock.mockResolvedValue(true);
      const result = await service.sendMail({ ...baseMailDto, type });

      expect(result).toBe(undefined);
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          from: mockSmtpConfig.user,
          to: baseMailDto.to,
          subject: MAIL_DETAILS[type].subject + baseMailDto.city,
          text: MAIL_DETAILS[type].text + baseMailDto.token,
        }),
      );
    },
  );

  it('should throw on invalid mail type', async () => {
    await expect(
      service.sendMail({ ...baseMailDto, type: 'invalid' as any }),
    ).rejects.toThrow(/Cannot read properties of undefined/);

    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('should throw InternalServerErrorException if transporter fails', async () => {
    sendMailMock.mockRejectedValue(new Error('SMTP error'));

    await expect(service.sendMail(baseMailDto)).rejects.toThrow(
      InternalServerErrorException,
    );

    expect(sendMailMock).toHaveBeenCalled();
  });
});
