import { FrequencyStatus } from '../constants/constants';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SubscribeDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(FrequencyStatus)
  when: FrequencyStatus;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}
