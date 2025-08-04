import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface DepartamentoTypeAttributes {
  id?: number
  name: string
}
export interface DepartamentoTypeModel
  extends Model<DepartamentoTypeAttributes>,
    DepartamentoTypeAttributes {}
export class DepartamentoType extends Model<DepartamentoTypeModel, DepartamentoTypeAttributes> {}

export type DepartamentoTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DepartamentoTypeModel
}

export function DepartamentoTypeFactory(sequelize: Sequelize): DepartamentoTypeStatic {
  return <DepartamentoTypeStatic>sequelize.define(
    'departamento',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'departamento',
      timestamps: false,
    }
  )
}
