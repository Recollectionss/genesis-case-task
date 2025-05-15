import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApiService } from './weather-api.service';
import { UrlBuilderService } from './url-builder/url-builder.service';
import weatherApiConfig from '../../config/weather-api.config';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock;

describe('WeatherApiService', () => {
  let service: WeatherApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherApiService,
        UrlBuilderService,
        { provide: weatherApiConfig.KEY, useValue: weatherApiConfig },
      ],
    }).compile();

    service = module.get<WeatherApiService>(WeatherApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get data about Kyiv', async () => {
    const data: GetCurrentWeatherDto = {
      city: 'Kyiv',
    };
    console.log(await service.getCurrentWeather(data));
  });
});
