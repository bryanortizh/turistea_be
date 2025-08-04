import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TermsAndConditionsAttributes {
  id?: number
  text_document?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface TermsAndConditionsModel extends Model<TermsAndConditionsAttributes>, TermsAndConditionsAttributes {}
export class TermsAndConditionsCategory extends Model<TermsAndConditionsModel, TermsAndConditionsAttributes> {}

export type TermsAndConditionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TermsAndConditionsModel
}

export function TermsAndConditionsFactory(sequelize: Sequelize): TermsAndConditionsStatic {
  return <TermsAndConditionsStatic>sequelize.define(
    'terms_and_conditions',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text_document: {
        type: DataTypes.TEXT,
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
      tableName: 'terms_and_conditions',
      timestamps: false,
    }
  )
}
