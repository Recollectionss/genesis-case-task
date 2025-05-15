import { Inject, Injectable } from '@nestjs/common';
import weatherApiConfig from '../../../config/weather-api.config';
import { ConfigType } from '@nestjs/config';
import {
  REQUIRED_API_PARAMS,
  RequiredApiParamKey,
  WEATHER_API_BASE_URL,
  WEATHER_API_PARAMS,
  WEATHER_API_PATHS,
  WEATHER_API_TYPE_RESPONSE,
} from '../constants/constants';
import { GetCurrentWeatherDto } from '../dto/get-current-weather.dto';
/*
  UrlBuilderService - class implement pattern builder for generate url to https://api.weatherapi.com/v1
  How use for current city weather url:

  data = {
    city= Kyiv
  }

  this
  .base()
  .current()
  .json()
  .withParams(data) (base lang English see WEATHER_API_PARAMS)
  .build()

  result: https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Kyiv&lang=en
*/

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
      lang: WEATHER_API_PARAMS.lang,
      q: data.city,
    });
    this.url += '?' + params.toString();
    return this;
  }

  build(): string {
    const finalUrl = this.url;
    this.url = '';
    this.validateUrl(finalUrl);
    return finalUrl;
  }

  private validateUrl(url: string): void {
    const parsed = new URL(url);
    const requiredKeys: RequiredApiParamKey[] = Object.keys(
      REQUIRED_API_PARAMS,
    ) as RequiredApiParamKey[];

    for (const key of requiredKeys) {
      if (!parsed.searchParams.has(key)) {
        throw new Error(`Missing required query param: ${key}`);
      }
    }
  }
}
