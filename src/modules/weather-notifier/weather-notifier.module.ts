import { Module } from '@nestjs/common';
import { WeatherNotifierService } from './weather-notifier.service';

@Module({
  providers: [WeatherNotifierService],
})
export class WeatherNotifierModule {}
