import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { WeatherModule } from '../weather/weather.module';
import { UserCityFrequenciesModule } from '../user-city-frequencies/user-city-frequencies.module';

@Module({
  imports: [WeatherModule, UserCityFrequenciesModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
