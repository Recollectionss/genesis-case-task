import { CurrentWeatherDto } from './current-weather.dto';

export class CityWeatherDto extends CurrentWeatherDto {
  city: string;
  token?: string;
}
