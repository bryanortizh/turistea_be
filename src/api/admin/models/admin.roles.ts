import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface AdminRolesAttributes {
  id?: number
  rol?: string
}
export interface AdminRolesModel
  extends Model<AdminRolesAttributes>,
    AdminRolesAttributes {}
export class AdminRoles extends Model<AdminRolesModel, AdminRolesAttributes> {}

export type AdminRolesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AdminRolesModel
}

export function AdminRolesFactory(sequelize: Sequelize): AdminRolesStatic {
  return <AdminRolesStatic>sequelize.define(
    'admin_roles',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rol: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'admin_roles',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['rol'],
        },
      ],
    }
  )
}
