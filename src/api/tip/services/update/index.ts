import { DataBase } from '../../../../database'
import moment from 'moment'

export const updateTip = async ({
  id,
  title,
  tip,
  motivation,
  state,
  key,
  path,
  size,
  adminId,
  tip_category_id,
}: {
  id: number
  title?: string
  tip?: string
  motivation?: string
  state?: boolean
  key?: string
  path?: string
  size?: string
  adminId: number
  tip_category_id?: number
}) => {
  try {
    return await DataBase.instance.tip.update(
      {
        title,
        tip,
        motivation,
        updated: moment.utc().toDate(),
        updated_by: adminId,
        state,
        key,
        path,
        size,
        tip_category_id,
      },
      {
        where: {
          id,
        },
      }
    )
  } catch (err) {
    throw err
  }
}
