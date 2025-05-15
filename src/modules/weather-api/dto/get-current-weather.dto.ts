import { IsNotEmpty, IsString } from 'class-validator';

export class GetCurrentWeatherDto {
  @IsNotEmpty()
  @IsString()
  city: string;
}
