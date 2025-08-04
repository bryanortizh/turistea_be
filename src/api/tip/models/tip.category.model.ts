import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TipCategoryAttributes {
  id?: number
  category?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface TipCategoryModel
  extends Model<TipCategoryAttributes>,
    TipCategoryAttributes {}
export class TipCategory extends Model<TipCategoryModel, TipCategoryAttributes> {}

export type TipCategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TipCategoryModel
}

export function TipCategoryFactory(sequelize: Sequelize): TipCategoryStatic {
  return <TipCategoryStatic>sequelize.define(
    'tip_category',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(100),
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
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'tip_category',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['category'],
        },
      ],
    }
  )
}
