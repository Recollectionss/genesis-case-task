import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { UserCityFrequenciesService } from '../user-city-frequencies/user-city-frequencies.service';
import { CityWeatherDto } from '../weather-api/dto/city-weather.dto';
import { FrequencyStatus } from '../constants/constants';

@Injectable()
export class WeatherNotifierService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly weatherApiService: WeatherApiService,
    private readonly userCityFrequenciesService: UserCityFrequenciesService,
  ) {}

  async setupHourlyNotification() {
    const data = await this.userCityFrequenciesService.getNotificationData(
      FrequencyStatus.HOURLY,
    );
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

      if (!userWeatherMap[email]) {
        userWeatherMap[email] = [];
      }

      userWeatherMap[email].push(weather);
    }

    for (const [email, weather] of Object.entries(userWeatherMap)) {
      await this.notificationService.sendNotificationMail(email, weather);
    }
  }
}
