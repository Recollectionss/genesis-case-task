import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';

@Injectable()
export class WeatherNotifierService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly weatherApiService: WeatherApiService,
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
  ) {}
}
