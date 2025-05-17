import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCityFrequencies } from '../../user-city-frequencies/entity/user-city-frequencies.entity';

@Table({ tableName: 'city' })
export class City extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    defaultValue: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => UserCityFrequencies, {
    foreignKey: 'cityId',
    sourceKey: 'id',
  })
  data: UserCityFrequencies[];
}
