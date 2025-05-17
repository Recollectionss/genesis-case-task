import { Test, TestingModule } from '@nestjs/testing';
import { UserCityFrequenciesService } from './user-city-frequencies.service';

describe('UserCityFrequenciesService', () => {
  let service: UserCityFrequenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCityFrequenciesService],
    }).compile();

    service = module.get<UserCityFrequenciesService>(
      UserCityFrequenciesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
