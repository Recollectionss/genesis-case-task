import postgresConfig from '../../config/postgres.config';
import appConfig from '../../config/app.config';
import { ConfigType } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { POSTGRES, SEQUELIZE } from './constants';
import { ENV, NODE_ENV } from '../../constants/env.constant';

export const postgresProviders = [
  {
    provide: SEQUELIZE,
    inject: [postgresConfig.KEY, appConfig.KEY],
    useFactory: async (
      postgresConf: ConfigType<typeof postgresConfig>,
      appConf: ConfigType<typeof appConfig>,
    ) => {
      const creeds = postgresConf[appConf.node_dev as ENV];
      if (!creeds) {
        throw new Error(`No DB credentials found for env: ${appConf.node_dev}`);
      }

      const sequelize = new Sequelize({
        logging: console.log,
        dialect: POSTGRES,
        host: postgresConf.host,
        port: postgresConf.port,
        database: postgresConf.db,
        username: creeds.user,
        password: creeds.pass,
      });

      if (appConf.node_dev === NODE_ENV.Testing) {
        await sequelize.sync({ force: true });
      }

      return sequelize;
    },
  },
];
