import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GuideAttributes {
  id?: number;
  name?: string;
  lastname?: string;
  type_document?: string;
  email?: string;
  number_document?: string;
  cellphone?: string;
  sexo?: string;
  state?: boolean;
  path_document?: string;
  key_document?: string;
  size_document?: string;
  path_photo?: string;
  key_photo?: string;
  size_photo?: string;
  created_by?: number;
  updated_by?: number;
  created?: Date;
  updated?: Date;
}
export interface GuideModel extends Model<GuideAttributes>, GuideAttributes {}
export class Guide extends Model<GuideModel, GuideAttributes> {}

export type GuideStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GuideModel;
};

export function GuideFactory(sequelize: Sequelize): GuideStatic {
  return <GuideStatic>sequelize.define(
    "guide",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
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
      cellphone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      sexo: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      path_document: {
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
      path_photo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      key_photo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size_photo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },

    {
      initialAutoIncrement: "1",
      tableName: "guide",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["number_document"],
        },
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
}
