import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FrequencyStatus } from '../constants/frequency-status.constants';

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
