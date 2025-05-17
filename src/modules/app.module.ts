import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import appConfig from '../config/app.config';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { WeatherModule } from './weather/weather.module';
import { UserCityFrequenciesModule } from './user-city-frequencies/user-city-frequencies.module';

@Module({
  imports: [
    PostgresModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    NotificationModule,
    WeatherApiModule,
    WeatherModule,
    UserCityFrequenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
