import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import appConfig from '../config/app.config';

@Module({
  imports: [
    PostgresModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
