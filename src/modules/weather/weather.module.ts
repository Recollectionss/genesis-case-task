import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherApiModule } from '../weather-api/weather-api.module';

@Module({
  imports: [WeatherApiModule],
  controllers: [WeatherController],
})
export class WeatherModule {}
