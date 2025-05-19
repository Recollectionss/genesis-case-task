import postgresConfig from '../../config/postgres.config';
import appConfig from '../../config/app.config';
import { ConfigType } from '@nestjs/config';
import { POSTGRES, SEQUELIZE } from './constants';
import { ENV, NODE_ENV } from '../../shared/constants/env.constant';
import { Sequelize } from 'sequelize-typescript';
import { City } from '../user-city-frequencies/city/entity/city.entity';
import { User } from '../user-city-frequencies/user/entity/user.entity';
import { Frequency } from '../user-city-frequencies/frequency/entity/frequency.entity';
import { UserCityFrequencies } from '../user-city-frequencies/entity/user-city-frequencies.entity';

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
        define: { schema: creeds.schema },
      });

      sequelize.addModels([City, User, Frequency, UserCityFrequencies]);

      if (appConf.node_dev === NODE_ENV.Testing) {
        await sequelize.sync({ force: true });
      }

      return sequelize;
    },
  },
];
