import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('app', () => ({
  port: Number(process.env.APP_PORT),
  node_dev: String(process.env.NODE_ENV),
}));
