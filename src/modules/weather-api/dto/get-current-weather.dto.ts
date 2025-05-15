import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetCurrentWeatherDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lang?: string;
}
