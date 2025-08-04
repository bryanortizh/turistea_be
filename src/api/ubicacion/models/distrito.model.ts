import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface DistritoAttributes {
  id?: number
  name?: string
  prov_id?: number

  $prov_id$?: number
}
export interface DistritoModel extends Model<DistritoAttributes>, DistritoAttributes {}
export class Distrito extends Model<DistritoModel, DistritoAttributes> {}

export type DistritoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DistritoModel
}

export function DistritoTypeFactory(sequelize: Sequelize): DistritoStatic {
  return <DistritoStatic>sequelize.define(
    'distrito',
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
      tableName: 'distrito',
      timestamps: false,
    }
  )
}
