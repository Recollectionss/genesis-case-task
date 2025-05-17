import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCityFrequencies } from './entity/user-city-frequencies.entity';
import { USER_CITY_FREQUENCIES_REPOSITORY } from './user-city-frequencies.provider';
import { CityService } from './city/city.service';
import { UserService } from './user/user.service';
import { FrequencyService } from './frequency/frequency.service';
import { RelationsIdType } from './types/relations-id.type';
import { SubscribeDto } from '../dto/subscribe.dto';
import Transaction from 'sequelize/types/transaction';

@Injectable()
export class UserCityFrequenciesService {
  constructor(
    @Inject(USER_CITY_FREQUENCIES_REPOSITORY)
    private readonly userCityFrequencyRepository: typeof UserCityFrequencies,
    private readonly cityService: CityService,
    private readonly userService: UserService,
    private readonly frequencyService: FrequencyService,
  ) {}

  async create(data: SubscribeDto, transaction: Transaction): Promise<string> {
    const relationsId: RelationsIdType = await this.findRelationsId(data);
    const [result, created]: [UserCityFrequencies, boolean] =
      await this.userCityFrequencyRepository.findOrCreate({
        where: relationsId,
        defaults: relationsId,
        transaction,
      });
    if (!created) {
      throw new ConflictException('Email already subscribed');
    }
    if (result.isDeleted) {
      await result.update({ isDeleted: false });
    }
    return result.confirmationToken;
  }

  async confirmSubscribe(token: string) {
    const [result]: [number] = await this.userCityFrequencyRepository.update(
      { isConfirmed: true },
      { where: { confirmationToken: token } },
    );
    if (result < 1) {
      throw new NotFoundException('Subscribe already confirmed');
    }
    return;
  }

  async delete(data: SubscribeDto): Promise<void> {
    const relationsId: RelationsIdType = await this.findRelationsId(data);
    await this.userCityFrequencyRepository.update(
      { isDeleted: true },
      { where: relationsId },
    );
    return;
  }

  private async findRelationsId(data: SubscribeDto): Promise<RelationsIdType> {
    const userId = await this.userService.findOrCreate({ email: data.email });
    const cityId = await this.cityService.findOrCreate({ name: data.city });
    const frequencyId = await this.frequencyService.findOrCreate({
      when: data.when,
    });
    return { userId, cityId, frequencyId };
  }
}
