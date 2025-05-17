import { Injectable } from '@nestjs/common';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';
import { WeatherApiService } from '../weather-api/weather-api.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
    private readonly weatherApiService: WeatherApiService,
  ) {}

  async subscribe(): Promise<void> {}

  async confirm(): Promise<void> {}

  async unsubscribe(): Promise<void> {}
}
