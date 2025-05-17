import { Frequency } from './entity/frequency.entity';

export const FREQUENCY_REPOSITORY = 'FREQUENCY_REPOSITORY';

export const FrequencyProvider = [
  {
    provide: FREQUENCY_REPOSITORY,
    useValue: Frequency,
  },
];
