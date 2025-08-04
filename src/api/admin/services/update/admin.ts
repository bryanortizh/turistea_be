import { DataBase } from '../../../../database'
import { AdminAttributes } from '../../models/admin.model'
import { WhereOptions } from 'sequelize'
import moment from 'moment'

export const desbloqueoTiempoAdmin = async ({
  userId,
}: {
  userId?: number
}): Promise<any> => {
  try {
    return await DataBase.instance.admin.update(
      {
        numIntentos: 0,
        status: 'H',
      },
      {
        where: { id: userId },
      }
    )
  } catch (err) {
    throw err
  }
}
export const desbloqueoAdmin = async ({ userId }: { userId?: number }): Promise<any> => {
  try {
    return await DataBase.instance.admin.update(
      {
        hora_bloqueo: undefined,
        cantidad_min_bloqueado: undefined,
        numIntentos: 0,
        status: 'H',
      },
      {
        where: { id: userId },
      }
    )
  } catch (err) {
    throw err
  }
}
export const actualizarNumIntentosAdmin = async ({
  userId,
  numIntentos,
}: {
  userId?: number
  numIntentos?: number
}): Promise<any> => {
  try {
    return await DataBase.instance.admin.update(
      {
        numIntentos: numIntentos,
      },
      {
        where: { id: userId },
      }
    )
  } catch (err) {
    throw err
  }
}
export const bloqueoAdmin = async ({ userId }: { userId?: number }): Promise<any> => {
  try {
    return await DataBase.instance.admin.update(
      {
        status: 'BI', //* BI == BLOQUEO
      },
      {
        where: { id: userId },
      }
    )
  } catch (err) {
    throw err
  }
}
export const bloqueoUsuarioTemporalAdmin = async ({
  userId,
  cantminutos,
}: {
  userId?: number
  cantminutos?: number
}): Promise<any> => {
  try {
    return await DataBase.instance.admin.update(
      {
        hora_bloqueo: new Date(),
        cantidad_min_bloqueado: cantminutos,
        status: 'BIT',
      },
      {
        where: { id: userId },
      }
    )
  } catch (err) {
    throw err
  }
}

export const updateAdmin = async ({
  where,
  state,
  updated_by,
  name,
  lastname,
  cellphone,
  key,
  path,
  size,
  admin_rol_id,
}: {
  where: WhereOptions<AdminAttributes>
  state?: boolean
  updated_by?: number
  name?: string
  lastname?: string
  cellphone?: number
  key?: string
  path?: string
  size?: string
  admin_rol_id?: number
}) => {
  try {
    return await DataBase.instance.admin.update(
      {
        updated_by,
        updated: moment.utc().toDate(),
        state,
        name,
        lastname,
        cellphone,
        key,
        path,
        size,
        admin_rol_id,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}



export const updatePasswordAdmin = async ({
  where,
  updated_by,
  salt,
  password
}: {
  where: WhereOptions<AdminAttributes>
  updated_by?: number
  salt: string
  password: string
}) => {
  try {
    return await DataBase.instance.admin.update(
      {
        updated_by,
        updated: moment.utc().toDate(),
        salt,
        password
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}