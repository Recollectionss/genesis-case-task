import { Module } from '@nestjs/common';
import { FrequencyService } from './frequency.service';
import { FrequencyProvider } from './frequency.providers';

@Module({
  providers: [FrequencyService, ...FrequencyProvider],
  exports: [FrequencyService],
})
export class FrequencyModule {}
