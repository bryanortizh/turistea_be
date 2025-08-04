import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { DataBase } from '../../../../database'
import { TokenAttributes } from '../../models/token.model'

export const createToken = async ({ userId, rol }: { userId?: number; rol: string }): Promise<TokenAttributes> => {
  try {
    return await DataBase.instance.token.create({
      userId: userId,
      uuid: uuidv4(),
      start_session: moment().utc().toDate(),
      last_petition: moment().utc().toDate(),
      rol,
    })
  } catch (err) {
    throw err
  }
}
