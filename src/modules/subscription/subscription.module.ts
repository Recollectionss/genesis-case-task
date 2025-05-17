import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { UserCityFrequenciesModule } from '../user-city-frequencies/user-city-frequencies.module';
import { NotificationModule } from '../notification/notification.module';
import { WeatherApiModule } from '../weather-api/weather-api.module';

@Module({
  imports: [WeatherApiModule, UserCityFrequenciesModule, NotificationModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
