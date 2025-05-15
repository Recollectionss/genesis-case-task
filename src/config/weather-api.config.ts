import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('weather-api', () => ({
  key: String(process.env.WEATHER_API_KEY),
}));
