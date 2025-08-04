import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

// que operacion esta haciendo el usuario -  (Action)

export interface ActionAttributes {
  id?: number
  value?:string
 
}
export interface ActionModel extends Model<ActionAttributes>, ActionAttributes {}
export class Action extends Model<ActionModel, ActionAttributes> {}

export type ActionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ActionModel
}

export function ActionFactory(sequelize: Sequelize): ActionStatic {
  return <ActionStatic>sequelize.define(
    'action',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING(70),
        // allowNull: false,
      },
 
    },
    {
      initialAutoIncrement: '1',
      tableName: 'action',
      timestamps: false
    }
  )
}
