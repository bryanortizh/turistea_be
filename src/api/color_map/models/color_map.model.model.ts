import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ColorTypeAttributes {
  id?: number;
  color: string;
}
export interface ColorTypeModel
  extends Model<ColorTypeAttributes>,
    ColorTypeAttributes {}
export class ColorType extends Model<ColorTypeModel, ColorTypeAttributes> {}

export type ColorTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ColorTypeModel;
};

export function ColorTypeFactory(sequelize: Sequelize): ColorTypeStatic {
  return <ColorTypeStatic>sequelize.define(
    "color_map",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING(20), //agress - entry
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "color_map",
      timestamps: false,
    }
  );
}
