import { DataBase } from '../../../../database/index'
import { TipCategoryAttributes } from '../../models/tip.category.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, Order } from 'sequelize/types'

export const findOneTipCategory = async ({
  where,
  attributes,
}: {
  where: WhereOptions<TipCategoryAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const tip_category = await DataBase.instance.tipCategory.findOne({
      where,
      attributes,
    })
    if (tip_category) return tip_category.get({ plain: true })
    return tip_category
  } catch (err) {
    throw err
  }
}
export const findAllTipCategory = async ({
  where,
  attributes,
  order,
}: {
  where?: WhereOptions<TipCategoryAttributes>
  attributes?: FindAttributeOptions
  order?: Order
}) => {
  try {
    return await DataBase.instance.tipCategory.findAll({
      where,
      attributes,
      order,
    })
  } catch (err) {
    throw err
  }
}
