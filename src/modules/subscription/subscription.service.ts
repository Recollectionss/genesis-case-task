import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { NotificationService } from '../notification/notification.service';
import { SubscribeDto } from '../dto/subscribe.dto';
import { TYPE_MAIL } from '../../constants/mail.types.constants';
import { SEQUELIZE } from '../postgres/constants';
import { Sequelize } from 'sequelize-typescript';
import { TokenSubscribeDto } from './dto/token-subscribe.dto';

@Injectable()
export class SubscriptionService {
  private readonly logger: Logger = new Logger(SubscriptionService.name);

  constructor(
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
    private readonly weatherApiService: WeatherApiService,
    private readonly notificationService: NotificationService,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
  ) {}

  async subscribe(data: SubscribeDto): Promise<void> {
    await this.weatherApiService.getCurrentWeather(data);
    const transaction = await this.sequelize.transaction();
    try {
      const token = await this.userCityFrequenciesService.create(
        data,
        transaction,
      );
      await this.notificationService.sendMail({
        to: data.email,
        city: data.city,
        type: TYPE_MAIL.SUBSCRIBE,
        token,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  async confirm(data: TokenSubscribeDto): Promise<void> {
    await this.userCityFrequenciesService.confirmSubscribe(data.token);
    return;
  }

  async unsubscribe(data: TokenSubscribeDto): Promise<void> {
    await this.userCityFrequenciesService.confirmUnsubscribe(data.token);
    return;
  }
}
