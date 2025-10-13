import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface DriversAttributes {
  id?: number;
  name?: string;
  lastname?: string;
  type_document?: string;
  email?: string;
  cellphone?: string;
  number_document?: string;
  number_plate?: string;
  brand_car?: string;
  model_car?: string;
  key?: string;
  size?: string;
  path_car?: string;
  key_document?: string;
  size_document?: string;
  path_document?: string;
  name_district?: string;
  name_province?: string;
  name_region?: string;
  created?: Date;
  updated?: Date;
  created_by?: number;
  updated_by?: number;
  state?: boolean;
}
export interface DriversModel
  extends Model<DriversAttributes>,
    DriversAttributes {}
export class Drivers extends Model<DriversModel, DriversAttributes> {}

export type DriversStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DriversModel;
};

export function DriversFactory(sequelize: Sequelize): DriversStatic {
  return <DriversStatic>sequelize.define(
    "drivers",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      lastname: {
        type: DataTypes.STRING(100),
      },
      cellphone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      type_document: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      number_document: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      number_plate: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      brand_car: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      model_car: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path_car: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      key_document: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size_document: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path_document: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      name_district: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name_province: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name_region: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "drivers",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["number_document"],
        },
        {
          unique: true,
          fields: ["number_plate"],
        },
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
}
