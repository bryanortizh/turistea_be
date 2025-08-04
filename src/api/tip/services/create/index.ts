import { DataBase } from '../../../../database'
import moment from 'moment'
import { TipAttributes } from '../../models/tip.model'

export const createTip = async ({
  adminId,
  key,
  motivation,
  path,
  size,
  tip,
  title,
  tip_category_id,
}: {
  adminId: number
  key: string
  motivation: string
  path: string
  size: string
  tip: string
  title: string
  tip_category_id: number
}): Promise<TipAttributes> => {
  try {
    return await DataBase.instance.tip.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      key,
      motivation,
      path,
      size,
      tip,
      title,
      tip_category_id,
    })
  } catch (err) {
    throw err
  }
}
