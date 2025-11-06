import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PackagesAttributes {
  id?: number;
  title?: string;
  description?: string;
  key?: string;
  size?: string;
  path_bg?: string;
  name_district?: string;
  name_province?: string;
  name_region?: string;
  id_driver?: number;
  state?: boolean;
  created?: Date;
  updated?: Date;
  created_by?: number;
  updated_by?: number;
}
export interface PackagesModel
  extends Model<PackagesAttributes>,
    PackagesAttributes {}
export class Packages extends Model<PackagesModel, PackagesAttributes> {}

export type PackagesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PackagesModel;
};

export function PackagesFactory(sequelize: Sequelize): PackagesStatic {
  return <PackagesStatic>sequelize.define(
    "packages",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING(300),
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
      path_bg: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
  
      name_region: {
        type: DataTypes.STRING(200),
      },
      id_driver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
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
      initialAutoIncrement: "1",
      tableName: "packages",
      timestamps: false,
    }
  );
}
