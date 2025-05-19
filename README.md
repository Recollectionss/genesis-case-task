# Weather Forecast API

| Criterion                | Status |
|--------------------------|--------|
| Swagger compliance       | ✅      |
| Database and migrations  | ✅      |
| Docker + Compose         | ✅      |
| README with description  | ✅      |
| Tests                    | ✅      |
| Deployment               | ❌      |
| HTML subscription page   | ❌      |


## Description

Genesis case task to Software Engineering School.

- **Language:** Node.js + TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Sequelize (with `sequelize-cli` for migrations)
- **Docker:** Dockerfile + Docker Compose
- **Testing:** Jest + Supertest

## Project setup

### Set configuration variables
First you need copy all from example.env to .env
```bash
$ cp example.env .env
```
Set required vars in created .env

```dotenv
# SMTP
SMTP_USER=ADD_YOUR_EMAIL
SMTP_PASSWORD=ADD_YOUR_APP_PASSWORD

# Weather api
WEATHER_API_KEY=ADD_YOUR_API_KEY
```

Start docker
```bash
$ docker compose up
```

## Run tests
Modules containing Tests

### Unit tests

- **Notification** 
  - [notification.service.spec.ts](src/modules/notification/notification.service.spec.ts)
  - [mail-builder.service.spec.ts](src/modules/notification/mail-builder/mail-builder.service.spec.ts)
- **WeatherApi**
  - [url-builder.service.spec.ts](src/modules/weather-api/url-builder/url-builder.service.spec.ts)
  - [weather-api.service.spec.ts](src/modules/weather-api/weather-api.service.spec.ts)
- **Subscription**
  - [subscription.controller.spec.ts](src/modules/subscription/subscription.controller.spec.ts)
  - [subscription.service.spec.ts](src/modules/subscription/subscription.service.spec.ts)
- **Weather**
  - [weather.controller.spec.ts](src/modules/weather/weather.controller.spec.ts)
- **WeatherNotifier** 
  - [weather-notifier.service.spec.ts](src/modules/weather-notifier/weather-notifier.service.spec.ts)

### e2e tests

 - [weather.e2e-spec.ts](test/weather.e2e-spec.ts)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Modules

- **Notification** – builds (via [MailBuilderService](src/modules/notification/mail-builder/mail-builder.service.ts)) and sends emails via SMTP.
- **WeatherApi** – constructs request URLs [UrlBuilderService](src/modules/weather-api/url-builder/url-builder.service.ts) and fetches current weather data.
- **Weather** – handles API requests for current weather.
- **Postgres** – sets up Sequelize and contains migration logic.
- **WeatherNotifier** – uses cron jobs to prepare and send weather notifications.
- **UserCityFrequencies** – main module for working with DB; includes submodules for managing `User`, `City`, and `Frequency` entities.
- **Subscription** -  handles API request for `subscribe`, `confirm`, `unsubscribe`


