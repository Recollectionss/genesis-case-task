import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from '../../config/postgres.config';
import appConfig from '../../config/app.config';
import { postgresProviders } from './postgres.providers';

@Module({
  imports: [ConfigModule.forRoot({ load: [postgresConfig, appConfig] })],
  providers: [...postgresProviders],
  exports: [...postgresProviders],
})
export class PostgresModule {}
