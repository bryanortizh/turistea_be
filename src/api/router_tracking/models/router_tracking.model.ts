import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface RouterTrackingAttributes {
  id?: number;
  title?: string;
  description?: string;
  key_bgone?: string;
  size_bgone?: string;
  path_bgone?: string;
  key_bgtwo?: string;
  size_bgtwo?: string;
  path_bgtwo?: string;
  key_bgthree?: string;
  size_bgthree?: string;
  path_bgthree?: string;
  id_package?: number;
  route_json?: string;
  state?: boolean;
  created?: Date;
  updated?: Date;
  created_by?: number;
  updated_by?: number;
}
export interface RouterTrackingModel
  extends Model<RouterTrackingAttributes>,
    RouterTrackingAttributes {}
export class RouterTracking extends Model<
  RouterTrackingModel,
  RouterTrackingAttributes
> {}

export type RouterTrackingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RouterTrackingModel;
};

export function RouterTrackingFactory(
  sequelize: Sequelize
): RouterTrackingStatic {
  return <RouterTrackingStatic>sequelize.define(
    "router_tracking",
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
      key_bgone: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size_bgone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path_bgone: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      key_bgtwo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size_bgtwo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path_bgtwo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      key_bgthree: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size_bgthree: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path_bgthree: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      id_package: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      route_json: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: "router_tracking",
      timestamps: false,
    }
  );
}
