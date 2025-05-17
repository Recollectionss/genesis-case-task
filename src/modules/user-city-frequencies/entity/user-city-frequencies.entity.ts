import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { City } from '../city/entity/city.entity';
import { Frequency } from '../frequency/entity/frequency.entity';
import { User } from '../user/entity/user.entity';

@Table({ tableName: 'user-city-frequencies' })
export class UserCityFrequencies extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isDeleted: boolean;

  @ForeignKey(() => City)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cityId: string;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => Frequency)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  frequencyId: string;

  @BelongsTo(() => Frequency)
  frequency: Frequency;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
