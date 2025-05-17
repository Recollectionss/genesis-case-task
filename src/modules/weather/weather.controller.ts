import { Controller, Get, Query } from '@nestjs/common';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { GetCurrentWeatherDto } from '../weather-api/dto/get-current-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherApiService: WeatherApiService) {}

  @Get()
  async getCurrentWeatherInCity(@Query() city: GetCurrentWeatherDto) {
    return this.weatherApiService.getCurrentWeather(city);
  }
}
