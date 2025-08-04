import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
  id?: number;
  password?: string;
  salt?: string;
  name?: string;
  code_verification?: string;
  date_of_birth?: string;
  lastname?: string;
  email?: string;
  cellphone?: number;
  status?: string;
  numIntentos?: number;
  fechaFinBloqueo?: Date;
  created?: Date;
  updated?: Date;
  dni?: number;
  hora_bloqueo?: Date;
  cantidad_min_bloqueado?: number;
  sexo?: string;
  state?: boolean;
  nightmode?: boolean;
  originalname?: string;
  filename?: string;
  key?: string;
  size?: string;
  ext?: string;
  path?: string;
  number_of_sessions?: number;
  //Days of session and date
  user_session_day?: number;
  date_user_session_day?: Date;
  code_departamento?: number;
  code_provincia?: number;
  ubigeo?: number;
  name_departamento?: string;
  name_provincia?: string;
  name_distrito?: string;
  device_id?: string;
  origin?: string;
  terms_and_conditions?: boolean;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_session_day: {
        type: DataTypes.NUMBER,
      },
      terms_and_conditions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      date_user_session_day: {
        type: DataTypes.DATEONLY,
      },
      device_id: {
        type: DataTypes.STRING(250),
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

      code_verification: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },

      date_of_birth: {
        type: DataTypes.DATE,
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
        defaultValue: "H",
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
      hora_bloqueo: {
        type: DataTypes.DATE,
      },
      cantidad_min_bloqueado: {
        type: DataTypes.INTEGER,
      },
      sexo: {
        type: DataTypes.STRING(100),
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      nightmode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      number_of_sessions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      originalname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      filename: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
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
      ext: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING(70),
        allowNull: true,
        defaultValue: "correo",
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "user",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
}
