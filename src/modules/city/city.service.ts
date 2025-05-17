import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from './city.providers';
import { City } from './entity/city.entity';
import { CityDto } from './dto/city.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject(CITY_REPOSITORY) private readonly cityRepository: typeof City,
  ) {}

  async findOrCreate(data: CityDto) {
    const dataValues = await this.cityRepository.findOrCreate({
      where: { name: data.name },
    });
    return dataValues[0];
  }
}
