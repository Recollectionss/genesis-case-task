import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';
import { UrlBuilderService } from './url-builder/url-builder.service';
import { ApiResponseDto } from './dto/api-response.dto';
import { CurrentWeatherDto } from '../../shared/dto/current-weather.dto';

@Injectable()
export class WeatherApiService {
  private readonly logger: Logger = new Logger(WeatherApiService.name);

  constructor(private readonly urlBuilder: UrlBuilderService) {}

  async getCurrentWeather(
    data: GetCurrentWeatherDto,
  ): Promise<CurrentWeatherDto> {
    try {
      const url = this.getCurrentWeatherJsonUrl(data);
      const resultData = await this.fetch(url);
      return {
        temperature: resultData.current.temp_c,
        humidity: resultData.current.humidity,
        description: resultData.current.condition.text,
      };
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  private getCurrentWeatherJsonUrl(data: GetCurrentWeatherDto): string {
    return this.urlBuilder.current().json().withParams(data).build();
  }

  private async fetch(url: string): Promise<ApiResponseDto> {
    const res: Response = await fetch(url);
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

  private handleResponseError(error: any): void {
    this.logger.error('Error get current weather data', error);
    if (error.status === HttpStatus.BAD_REQUEST) {
      if (error.code === 1006) {
        throw new BadRequestException('City not found');
      }
      if (error.code === 1003) {
        throw new InternalServerErrorException(error.message);
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
