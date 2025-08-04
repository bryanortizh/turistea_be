import { DataBase } from '../../../../database'

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
