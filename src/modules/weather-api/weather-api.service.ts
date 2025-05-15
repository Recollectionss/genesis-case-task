import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';
import { UrlBuilderService } from './url-builder/url-builder.service';
import { ApiResponseDto } from './dto/api-response.dto';

@Injectable()
export class WeatherApiService {
  private readonly logger = new Logger(WeatherApiService.name);

  constructor(private readonly urlBuilder: UrlBuilderService) {}

  async getCurrentWeather(data: GetCurrentWeatherDto) {
    try {
      const url = this.getCurrentWeatherJsonUrl(data);
      return await this.fetch(url);
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  private getCurrentWeatherJsonUrl(data: GetCurrentWeatherDto): string {
    return this.urlBuilder.base().current().json().withParams(data).build();
  }

  private async fetch(url: string): Promise<ApiResponseDto> {
    const res = await fetch(url);
    if (!res.ok) {
      const errorBody = await res.json();
      throw {
        status: res.status,
        code: errorBody.error?.code,
        message: errorBody.error?.message,
      };
    }
    return await res.json();
  }

  private handleResponseError(error: any) {
    this.logger.error('Error get current weather data', error);
    if (error.status === HttpStatus.BAD_REQUEST) {
      if (error.code === 1006) {
        throw new NotFoundException('City not found');
      }
      if (error.code === 1003) {
        throw new InternalServerErrorException(error.message.split(': ')[1]);
      }
    }
    if (
      error.status === HttpStatus.UNAUTHORIZED ||
      error.status === HttpStatus.FORBIDDEN
    ) {
      throw new InternalServerErrorException('Api key error');
    }
    throw new InternalServerErrorException(error.message);
  }
}
