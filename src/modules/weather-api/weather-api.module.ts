import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlBuilderService } from './url-builder/url-builder.service';
import weatherApiConfig from '../../config/weather-api.config';
import { WeatherApiService } from './weather-api.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [weatherApiConfig] })],
  providers: [WeatherApiService, UrlBuilderService],
  exports: [WeatherApiService],
})
export class WeatherApiModule {}
