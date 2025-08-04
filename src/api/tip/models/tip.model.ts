import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TipAttributes {
  id?: number
  created?: Date
  updated?: Date
  title?: string
  tip?: string
  motivation?: string
  path?: string
  key?: string
  size?: string
  created_by?: number
  updated_by?: number
  state?: boolean
  tip_category_id?: number
  '$package.id$'?: number
}
export interface TipModel extends Model<TipAttributes>, TipAttributes {}
export class Tip extends Model<TipModel, TipAttributes> {}

export type TipStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TipModel
}

export function TipFactory(sequelize: Sequelize): TipStatic {
  return <TipStatic>sequelize.define(
    'tip',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tip_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      tip: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      motivation: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'tip',
      timestamps: false,
    }
  )
}
