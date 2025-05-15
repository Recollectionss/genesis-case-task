import { ApiResponseConditionDto } from './api-response-condition.dto';

export class ApiResponseCurrentDto {
  temp_c: number;
  condition: ApiResponseConditionDto;
  humidity: number;
}
