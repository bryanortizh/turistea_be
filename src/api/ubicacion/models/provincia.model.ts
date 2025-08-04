import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface ProvinciaAttributes {
  id?: number
  name?: string
  region_id?: number

  $region_id$?: number
}
export interface ProvinciaModel extends Model<ProvinciaAttributes>, ProvinciaAttributes {}
export class Provincia extends Model<ProvinciaModel, ProvinciaAttributes> {}

export type ProvinciaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProvinciaModel
}

export function ProvinciaTypeFactory(sequelize: Sequelize): ProvinciaStatic {
  return <ProvinciaStatic>sequelize.define(
    'provincia',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'provincia',
      timestamps: false,
    }
  )
}
