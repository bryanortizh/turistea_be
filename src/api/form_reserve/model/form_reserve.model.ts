import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { GlobalStatic } from "../../global/models/global.model";

export interface FormModelReserveAttributes {
  id?: number;
  type_document?: string;
  number_document?: string;
  full_name?: string;
  id_user?: number;
  id_package?: number;
  id_router_tracking?: number;
  date_reserve?: Date;
  cant_people?: number;
  users_json?: string;
  guide?: boolean;
  terrace?: boolean;
  price_total?: number;
  status_form?: string;
  state?: boolean;
  created?: Date;
  updated?: Date;
  created_by?: number;
  updated_by?: number;
}
export interface FormReserveModel
  extends Model<FormModelReserveAttributes>,
    FormModelReserveAttributes {}
export class FormReserve extends Model<
  FormReserveModel,
  FormModelReserveAttributes
> {}

export type FormReserveStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FormReserveModel;
};

export function FormReserveFactory(sequelize: Sequelize): FormReserveStatic {
  return <FormReserveStatic>sequelize.define(
    "form_reserve",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type_document: { type: DataTypes.STRING, allowNull: true },
      number_document: { type: DataTypes.STRING, allowNull: true },
      full_name: { type: DataTypes.STRING, allowNull: true },
      id_user: { type: DataTypes.INTEGER, allowNull: true },
      id_package: { type: DataTypes.INTEGER, allowNull: true },
      id_router_tracking: { type: DataTypes.INTEGER, allowNull: true },
      date_reserve: { type: DataTypes.DATE, allowNull: true },
      cant_people: { type: DataTypes.INTEGER, allowNull: true },
      users_json: { type: DataTypes.TEXT, allowNull: true },
      guide: { type: DataTypes.BOOLEAN, allowNull: true },
      terrace: { type: DataTypes.BOOLEAN, allowNull: true },
      price_total: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      status_form: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.BOOLEAN, allowNull: true },
      created: { type: DataTypes.DATE, allowNull: true },
      updated: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      initialAutoIncrement: "1",
      tableName: "form_reserve",
      timestamps: false,
    }
  );
}
