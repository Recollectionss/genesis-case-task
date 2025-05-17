import { Inject, Injectable } from '@nestjs/common';
import { UserCityFrequencies } from './entity/user-city-frequencies.entity';
import { USER_CITY_FREQUENCIES_REPOSITORY } from './user-city-frequencies.provider';
import { CityService } from './city/city.service';
import { UserService } from './user/user.service';
import { FrequencyService } from './frequency/frequency.service';
import { UserCityFrequenciesDto } from './dto/user-city-frequencies.dto';

@Injectable()
export class UserCityFrequenciesService {
  constructor(
    @Inject(USER_CITY_FREQUENCIES_REPOSITORY)
    private readonly userCityFrequencyRepository: typeof UserCityFrequencies,
    private readonly cityService: CityService,
    private readonly userService: UserService,
    private readonly frequencyService: FrequencyService,
  ) {}

  async create(data: UserCityFrequenciesDto) {
    const [user, city, frequency] = await this.findRelations(data);
    const result = await this.userCityFrequencyRepository.findOrCreate({
      where: {
        userId: user.id,
        cityId: city.id,
        frequencyId: frequency.id,
      },
      defaults: {
        userId: user.id,
        cityId: city.id,
        frequencyId: frequency.id,
      },
    });
    const dataValues = result[0];
    if (dataValues.isDeleted) {
      await dataValues.update({ isDeleted: false });
    }
    return;
  }

  async delete(data: UserCityFrequenciesDto) {
    const [user, city, frequency] = await this.findRelations(data);
    await this.userCityFrequencyRepository.update(
      { isDeleted: true },
      {
        where: {
          userId: user.id,
          cityId: city.id,
          frequencyId: frequency.id,
        },
      },
    );
  }

  private async findRelations(data: UserCityFrequenciesDto) {
    const user = await this.userService.findOrCreate({ email: data.email });
    const city = await this.cityService.findOrCreate({ name: data.city });
    const frequency = await this.frequencyService.findOrCreate({
      when: data.when,
    });
    return [user, city, frequency];
  }
}
