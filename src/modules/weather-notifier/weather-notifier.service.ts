import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';
import { CityWeatherDto } from '../weather-api/dto/city-weather.dto';
import { FrequencyStatus } from '../constants/constants';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherNotifierService {
  private logger = new Logger(WeatherNotifierService.name);
  constructor(
    private readonly notificationService: NotificationService,
    private readonly weatherApiService: WeatherApiService,
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
  ) {}

  // Every day from 8 AM to 8PM
  @Cron('0 8-20 * * *')
  private async hourlyNotifications() {
    await this.setupNotifications(FrequencyStatus.HOURLY);
  }

  // Every day in 8 AM
  @Cron('0 8 * * *')
  private async dailyNotifications() {
    await this.setupNotifications(FrequencyStatus.DAILY);
  }

  private async setupNotifications(when: FrequencyStatus) {
    const data =
      await this.userCityFrequenciesService.getNotificationData(when);
    // Get all city
    const cityNames = [...new Set(data.map((entry) => entry.city.name))];

    // Get current weather for all cities
    const cityWeatherArray: CityWeatherDto[] = await Promise.all(
      cityNames.map(async (cityName) => {
        const weather = await this.weatherApiService.getCurrentWeather({
          city: cityName,
        });
        return { city: cityName, ...weather } as CityWeatherDto;
      }),
    );

    const cityWeatherMap: Record<string, CityWeatherDto> =
      cityWeatherArray.reduce(
        (acc, weather) => {
          acc[weather.city] = weather;
          return acc;
        },
        {} as Record<string, CityWeatherDto>,
      );

    const userWeatherMap: Record<string, CityWeatherDto[]> = {};

    for (const entry of data) {
      const email = entry.user.email;
      const cityName = entry.city.name;
      const weather = cityWeatherMap[cityName];
      weather.token = entry.confirmationToken;

      if (!userWeatherMap[email]) {
        userWeatherMap[email] = [];
      }

      userWeatherMap[email].push(weather);
    }

    await Promise.all(
      Object.entries(userWeatherMap).map(async ([email, weather]) => {
        try {
          await this.notificationService.sendNotificationMail(email, weather);
        } catch (error) {
          this.logger.error(
            `Fail send ${when} weather notification ${email}`,
            error,
          );
        }
      }),
    );
  }
}
