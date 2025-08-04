import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface NoticiaAttributes {
  id?: number;
  created?: Date;
  updated?: Date;
  title?: string;
  titular?: string;
  path?: string;
  key?: string;
  size?: string;
  created_by?: number;
  updated_by?: number;
  state?: boolean;
  code_departamento?: number;
  code_provincia?: number;
  ubigeo?: number;
  name_departamento?: string;
  name_provincia?: string;
  name_distrito?: string;
}
export interface NoticiaModel
  extends Model<NoticiaAttributes>,
    NoticiaAttributes {}
export class Noticias extends Model<NoticiaModel, NoticiaAttributes> {}

export type NoticiaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NoticiaModel;
};

export function NoticiaTypeFactory(sequelize: Sequelize): NoticiaStatic {
  return <NoticiaStatic>sequelize.define(
    "noticias",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      titular: {
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
      code_departamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code_provincia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ubigeo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name_departamento: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name_provincia: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name_distrito: {
        type: DataTypes.STRING(200),
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
      initialAutoIncrement: "1",
      tableName: "noticias",
      timestamps: false,
    }
  );
}
