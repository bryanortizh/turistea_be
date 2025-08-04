import { DataBase } from '../../../../database'
import moment from 'moment'
import { TipCategoryAttributes } from '../../models/tip.category.model'

export const createtTipCategory = async ({
  tip_category,
}: {
  tip_category: TipCategoryAttributes
}) => {
  try {
    return await DataBase.instance.tipCategory.create({
      created: moment.utc().toDate(),
      ...tip_category,
    })
  } catch (err) {
    throw err
  }
}
