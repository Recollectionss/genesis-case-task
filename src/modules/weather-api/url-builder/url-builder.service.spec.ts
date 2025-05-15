import { Test, TestingModule } from '@nestjs/testing';
import { UrlBuilderService } from './url-builder.service';
import { GetCurrentWeatherDto } from '../dto/get-current-weather.dto';
import weatherApiConfig from '../../../config/weather-api.config';
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_PATHS,
  WEATHER_API_TYPE_RESPONSE,
} from '../constants/constants';

describe('UrlBuilderService', () => {
  let service: UrlBuilderService;
  const mockWeatherApiConfig = {
    key: 'test-api-key',
  };

  const mockParams: GetCurrentWeatherDto = {
    city: 'Kharkiv',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlBuilderService,
        { provide: weatherApiConfig.KEY, useValue: mockWeatherApiConfig },
      ],
    }).compile();

    service = module.get<UrlBuilderService>(UrlBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('success generate url', () => {
    const result = `${WEATHER_API_BASE_URL}${WEATHER_API_PATHS.CURRENT}${WEATHER_API_TYPE_RESPONSE.JSON}?lang=en&q=${mockParams.city}&key=${mockWeatherApiConfig.key}`;
    const dataUrl = service
      .base()
      .current()
      .json()
      .withParams(mockParams)
      .build();
    expect(dataUrl).toEqual(result);
  });
});
