import { Inject, Injectable } from '@nestjs/common';
import { FREQUENCY_REPOSITORY } from './frequency.providers';
import { Frequency } from './entity/frequency.entity';
import { FrequencyDto } from './dto/frequency.dto';

@Injectable()
export class FrequencyService {
  constructor(
    @Inject(FREQUENCY_REPOSITORY)
    private readonly frequencyRepository: typeof Frequency,
  ) {}

  async findOrCreate(data: FrequencyDto): Promise<string> {
    const dataValues = await this.frequencyRepository.findOrCreate({
      where: {
        when: data.when,
      },
    });
    return dataValues[0].id;
  }
}
