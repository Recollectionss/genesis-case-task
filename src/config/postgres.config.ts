import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('postgres', () => ({
  port: Number(process.env.POSTGRES_PORT),
  host: String(process.env.POSTGRES_HOST),
  db: String(process.env.POSTGRES_DB),
  testing: {
    user: String(process.env.POSTGRES_TEST_USER),
    pass: String(process.env.POSTGRES_TEST_PASSWORD),
    schema: 'test',
  },
  development: {
    user: String(process.env.POSTGRES_TEST_USER),
    pass: String(process.env.POSTGRES_TEST_PASSWORD),
    schema: 'test',
  },
  production: {
    user: String(process.env.POSTGRES_APP_USER),
    pass: String(process.env.POSTGRES_APP_PASSWORD),
    schema: 'public',
  },
}));
