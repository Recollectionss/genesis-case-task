import { UserCityFrequencies } from './entity/user-city-frequencies.entity';

export const USER_CITY_FREQUENCIES_REPOSITORY =
  'USER_CITY_FREQUENCIES_REPOSITORY';

export const UserCityFrequencyProvider = [
  {
    provide: USER_CITY_FREQUENCIES_REPOSITORY,
    useValue: UserCityFrequencies,
  },
];
