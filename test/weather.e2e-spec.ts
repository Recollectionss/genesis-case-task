import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { WeatherModule } from '../src/modules/weather/weather.module';

describe('WeatherController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WeatherModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/weather (GET) success', () => {
    return request(app.getHttpServer())
      .get('/weather')
      .query({ city: 'Kyiv' })
      .expect(200);
  });

  it('/weather (GET) fail - city null', () => {
    return request(app.getHttpServer())
      .get('/weather')
      .query({ city: '' })
      .expect(400);
  });

  it('/weather (GET) fail - city not sting', () => {
    return request(app.getHttpServer())
      .get('/weather')
      .query({ city: 1 })
      .expect(400);
  });

  it('/weather (GET) fail - city not found', () => {
    return request(app.getHttpServer())
      .get('/weather')
      .query({ city: 'jvfnv' })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
