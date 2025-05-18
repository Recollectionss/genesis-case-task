import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlBuilderService } from './url-builder/url-builder.service';
import weatherApiConfig from '../../config/weather-api.config';
import { WeatherApiService } from './weather-api.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [weatherApiConfig] })],
  providers: [
    WeatherApiService,
    {
      provide: UrlBuilderService,
      useValue: UrlBuilderService,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [WeatherApiService],
})
export class WeatherApiModule {}
