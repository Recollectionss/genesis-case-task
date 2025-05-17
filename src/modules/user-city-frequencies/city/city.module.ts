import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityProvider } from './city.providers';

@Module({
  providers: [CityService, ...CityProvider],
  exports: [CityService],
})
export class CityModule {}
