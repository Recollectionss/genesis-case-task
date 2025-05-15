import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import appConfig from './config/app.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import { postgresTestConnection } from './modules/postgres/postgres.test.connection';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const appConf: ConfigType<typeof appConfig> = configService.get('app');
  const postgresConf: ConfigType<typeof postgresConfig> =
    configService.get('postgres');
  await postgresTestConnection(postgresConf, appConf);
  await app.listen(appConf.port);
}
bootstrap();
