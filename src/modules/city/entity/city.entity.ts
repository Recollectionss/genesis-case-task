import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
