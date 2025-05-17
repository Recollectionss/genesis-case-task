import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { City } from '../../city/entity/city.entity';
import { Frequency } from '../../frequency/entity/frequency.entity';
import { User } from '../../user/entity/user.entity';

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

  @ForeignKey(() => City)
  @Column({})
  cityId: string;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => Frequency)
  @Column({})
  frequencyId: string;

  @BelongsTo(() => Frequency)
  frequency: Frequency;

  @ForeignKey(() => User)
  @Column({})
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
