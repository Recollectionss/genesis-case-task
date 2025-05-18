import { Test, TestingModule } from '@nestjs/testing';
import { WeatherNotifierService } from './weather-notifier.service';

describe('WeatherNotifierService', () => {
  let service: WeatherNotifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherNotifierService],
    }).compile();

    service = module.get<WeatherNotifierService>(WeatherNotifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
