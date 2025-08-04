import { DataBase } from '../../../../database'
import moment from 'moment'
import { TipCategoryAttributes } from '../../models/tip.category.model'
import { WhereOptions } from 'sequelize'

export const updateTipCategory = async ({
  tip_category,
  where,
}: {
  tip_category: TipCategoryAttributes
  where: WhereOptions<TipCategoryAttributes>
}) => {
  try {
    return await DataBase.instance.tipCategory.update(
      {
        updated: moment.utc().toDate(),
        ...tip_category,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
