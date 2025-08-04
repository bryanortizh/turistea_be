import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UbigeoTypeAttributes {
  id?: number;
  departamento: string;
  code_departamento: number;
  provincia: string;
  code_provincia: string;
  distrito: string;
  ubigeo: string;
  $code_departamento$?: number;
}
export interface UbigeoTypeModel
  extends Model<UbigeoTypeAttributes>,
    UbigeoTypeAttributes {}
export class UbigeoType extends Model<UbigeoTypeModel, UbigeoTypeAttributes> {}

export type UbigeoTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UbigeoTypeModel;
};

export function UbigeoTypeFactory(sequelize: Sequelize): UbigeoTypeStatic {
  return <UbigeoTypeStatic>sequelize.define(
    "ubigeo",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      departamento: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
      code_departamento: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
      provincia: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
      code_provincia: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
      distrito: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
      ubigeo: {
        type: DataTypes.STRING(255), //agress - entry
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "ubigeo",
      timestamps: false,
    }
  );
}
