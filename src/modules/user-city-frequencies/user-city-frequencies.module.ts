import { Module } from '@nestjs/common';
import { UserCityFrequenciesService } from './user-city-frequencies.service';
import { UserCityFrequencyProvider } from './user-city-frequencies.provider';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { FrequencyModule } from './frequency/frequency.module';
import { PostgresModule } from '../postgres/postgres.module';

@Module({
  imports: [PostgresModule, UserModule, CityModule, FrequencyModule],
  providers: [UserCityFrequenciesService, ...UserCityFrequencyProvider],
  exports: [UserCityFrequenciesService],
})
export class UserCityFrequenciesModule {}
