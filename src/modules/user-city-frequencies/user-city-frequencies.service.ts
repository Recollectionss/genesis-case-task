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
import { v4 as uuidv4 } from 'uuid';
import { Frequency } from './frequency/entity/frequency.entity';
import { FrequencyStatus } from '../constants/constants';
import { User } from './user/entity/user.entity';
import { City } from './city/entity/city.entity';

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
      if (result.isDeleted && !result.isConfirmed) {
        const confirmationToken = uuidv4();
        await result.update({ isDeleted: false, confirmationToken });
        return confirmationToken;
      }
      throw new ConflictException('Email already subscribed');
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

  async confirmUnsubscribe(token: string): Promise<void> {
    await this.userCityFrequencyRepository.update(
      { isDeleted: true, isConfirmed: false },
      { where: { confirmationToken: token } },
    );
    return;
  }

  async getNotificationData(when: FrequencyStatus) {
    return await this.userCityFrequencyRepository.findAll({
      where: {
        isConfirmed: true,
        isDeleted: false,
      },
      include: [
        {
          model: Frequency,
          where: {
            when,
          },
          required: true,
        },
        {
          model: User,
          required: true,
          attributes: ['email'],
        },
        {
          model: City,
          required: true,
          attributes: ['name'],
        },
      ],
    });
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
