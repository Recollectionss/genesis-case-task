import { Inject, Injectable } from '@nestjs/common';
import weatherApiConfig from '../../../config/weather-api.config';
import { ConfigType } from '@nestjs/config';
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_PARAMS,
  WEATHER_API_PATHS,
  WEATHER_API_TYPE_RESPONSE,
} from '../constants/constants';
import { GetCurrentWeatherDto } from '../dto/get-current-weather.dto';

@Injectable()
export class UrlBuilderService {
  private url: string;

  constructor(
    @Inject(weatherApiConfig.KEY)
    private readonly weatherApiConf: ConfigType<typeof weatherApiConfig>,
  ) {}

  base(): UrlBuilderService {
    this.url = WEATHER_API_BASE_URL;
    return this;
  }

  current(): UrlBuilderService {
    this.url += WEATHER_API_PATHS.CURRENT;
    return this;
  }

  json(): UrlBuilderService {
    this.url += WEATHER_API_TYPE_RESPONSE.JSON;
    return this;
  }

  withParams(data: GetCurrentWeatherDto): UrlBuilderService {
    const params = new URLSearchParams({
      key: this.weatherApiConf.key,
      lang: data.lang ? data.lang : WEATHER_API_PARAMS.lang,
      q: data.city,
    });
    this.url += '?' + params.toString();
    return this;
  }

  build(): string {
    const finalUrl = this.url;
    this.url = '';
    return finalUrl;
  }
}
