import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface AdminAttributes {
  id?: number
  password?: string
  salt?: string
  name?: string
  lastname?: string
  email?: string
  cellphone?: number
  status?: string
  numIntentos?: number
  fechaFinBloqueo?: Date
  hora_bloqueo?: Date
  cantidad_min_bloqueado?: number
  state?: boolean
  key?: string
  size?: string
  path?: string
  admin_rol_id?: number
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface AdminModel extends Model<AdminAttributes>, AdminAttributes {}
export class Admin extends Model<AdminModel, AdminAttributes> {}

export type AdminStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AdminModel
}

export function AdminFactory(sequelize: Sequelize): AdminStatic {
  return <AdminStatic>sequelize.define(
    'admin',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.STRING(300),
      },
      salt: {
        type: DataTypes.STRING(500),
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cellphone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(100),
        defaultValue: 'H',
      },
      numIntentos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fechaFinBloqueo: {
        type: DataTypes.DATE,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hora_bloqueo: {
        type: DataTypes.DATE,
      },
      cantidad_min_bloqueado: {
        type: DataTypes.INTEGER,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      key: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'admin',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  )
}
