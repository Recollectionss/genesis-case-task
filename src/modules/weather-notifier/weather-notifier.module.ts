import { Module } from '@nestjs/common';
import { WeatherNotifierService } from './weather-notifier.service';
import { WeatherApiModule } from '../weather-api/weather-api.module';
import { NotificationModule } from '../notification/notification.module';
import { UserCityFrequenciesModule } from '../user-city-frequencies/user-city-frequencies.module';

@Module({
  imports: [WeatherApiModule, NotificationModule, UserCityFrequenciesModule],
  providers: [WeatherNotifierService],
})
export class WeatherNotifierModule {}
