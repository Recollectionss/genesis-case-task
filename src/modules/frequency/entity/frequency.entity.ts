import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FrequencyStatus } from '../../constants/constants';
import { UserCityFrequencies } from '../../user-city-frequencies/entity/user-city-frequencies.entity';

@Table({ tableName: 'frequency' })
export class Frequency extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    defaultValue: DataType.ENUM(...Object.values(FrequencyStatus)),
    allowNull: false,
    unique: true,
  })
  when: FrequencyStatus;

  @HasMany(() => UserCityFrequencies, {
    foreignKey: 'frequencyId',
    sourceKey: 'id',
  })
  data: UserCityFrequencies[];
}
