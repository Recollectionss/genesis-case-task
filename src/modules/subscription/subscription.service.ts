import { Injectable } from '@nestjs/common';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { NotificationService } from '../notification/notification.service';
import { SubscribeDto } from '../dto/subscribe.dto';
import { TYPE_MAIL } from '../../constants/mail.types.constants';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
    private readonly weatherApiService: WeatherApiService,
    private readonly notificationService: NotificationService,
  ) {}

  async subscribe(data: SubscribeDto): Promise<void> {
    await this.weatherApiService.getCurrentWeather(data);
    const token = await this.userCityFrequenciesService.create(data);
    await this.notificationService.sendMail({
      to: data.email,
      city: data.city,
      type: TYPE_MAIL.SUBSCRIBE,
      token,
    });
  }

  async confirm(): Promise<void> {}

  async unsubscribe(): Promise<void> {}
}
