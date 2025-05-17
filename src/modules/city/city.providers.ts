import { City } from './entity/city.entity';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export const CityProvider = [
  {
    provide: CITY_REPOSITORY,
    useValue: City,
  },
];
