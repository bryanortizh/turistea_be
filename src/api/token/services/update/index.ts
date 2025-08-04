import { Op } from 'sequelize'
import { DataBase } from '../../../../database'
import moment from 'moment'

export const closeAllSession = async ({ userId, rol }: { userId: number; rol: string }) => {
  try {
    return await DataBase.instance.token.update(
      {
        last_session: moment.utc(),
        state: false,
      },
      {
        where: {
          [Op.and]: {
            userId,
            state: true,
            rol,
          },
        },
      }
    )
  } catch (err) {
    throw err
  }
}
export const updateToken = async ({
  uuid,
  state,
  last_petition,
  last_session,
}: {
  uuid?: string
  state?: boolean
  last_petition?: Date
  last_session?: Date
}) => {
  try {
    return await DataBase.instance.token.update(
      {
        last_session: last_session || moment.utc().toDate(),
        state,
        last_petition,
      },
      {
        where: {
          [Op.and]: {
            uuid,
            state: true,
          },
        },
      }
    )
  } catch (err) {
    throw err
  }
}
