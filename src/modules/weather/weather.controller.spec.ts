import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { GetCurrentWeatherDto } from '../weather-api/dto/get-current-weather.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let weatherApiService: WeatherApiService;

  const mockWeatherApiService = {
    getCurrentWeather: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherApiService,
          useValue: mockWeatherApiService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherApiService = module.get<WeatherApiService>(WeatherApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return current weather for a city', async () => {
    const dto: GetCurrentWeatherDto = {
      city: '',
    };
    const expectedResult = { temp: 20, description: 'Sunny' };

    mockWeatherApiService.getCurrentWeather.mockResolvedValue(expectedResult);

    const result = await controller.getCurrentWeatherInCity(dto);

    expect(result).toEqual(expectedResult);
    expect(mockWeatherApiService.getCurrentWeather).toHaveBeenCalledWith(dto);
  });
});
