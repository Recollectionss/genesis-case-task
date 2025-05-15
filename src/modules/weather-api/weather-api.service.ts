import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import weatherApiConfig from '../../config/weather-api.config';
import { ConfigType } from '@nestjs/config';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';
import { UrlBuilderService } from './url-builder/url-builder.service';

@Injectable()
export class WeatherApiService {
  private readonly logger = new Logger(WeatherApiService.name);

  constructor(
    @Inject(weatherApiConfig.KEY)
    private readonly weatherApiConf: ConfigType<typeof weatherApiConfig>,
    private readonly urlBuilder: UrlBuilderService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCurrentWeather(data: GetCurrentWeatherDto) {
    try {
      // const url = this.getCurrentWeatherJsonUrl(data);
      // const res = await fetch(url);
    } catch (e) {
      this.logger.error('Error get current weather data', e);
      throw new InternalServerErrorException(e.message);
    }
  }

  private getCurrentWeatherJsonUrl(data: GetCurrentWeatherDto): string {
    return this.urlBuilder.base().current().json().withParams(data).build();
  }
}
