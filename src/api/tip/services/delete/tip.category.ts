import { DataBase } from '../../../../database'
import { TipCategoryAttributes } from '../../models/tip.category.model'
import { WhereOptions } from 'sequelize'

export const deleteTipCategory = async ({
  where,
}: {
  where: WhereOptions<TipCategoryAttributes>
}) => {
  try {
    return await DataBase.instance.tipCategory.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
