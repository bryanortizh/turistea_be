import { DataBase } from '../../../../database'
import { TipModel, TipAttributes } from '../../models/tip.model'
import { Op, Order, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'
import { LoginTicket } from 'google-auth-library'

export interface IFindAllTips {
  page: number
  rows: TipModel[]
  count: number
}

export const SearchTip = async ({ regex, order }: { regex?: string; order: Order }) => {
  try {
    const limit: number = 12
    const tips = await DataBase.instance.tip.findAll({
      where: {
        state: true,
        [Op.or]: {
          id: {
            [Op.regexp]: regex,
          },
          title: {
            [Op.regexp]: regex,
          },
          motivation: {
            [Op.regexp]: regex,
          },
          tip: {
            [Op.regexp]: regex,
          },
          '$tip_category.category$': { [Op.regexp]: regex },
        },
      },
      include: [
        {
          model: DataBase.instance.tipCategory,
          attributes: ['id', 'category'],
          required: true,
          // where:{
          //   category:{
          //     [Op.regexp]:regex
          //   }
          // }
        },
      ],
      attributes: ['title', 'tip', 'motivation', 'tip', 'id', 'tip_category_id', 'size', 'key', 'path'],
      order,
      limit,
      // logging:console.log
    })
    return tips
  } catch (err) {
    throw err
  }
}

export const findAllTips = async ({
  page,
  where,
  attributes,
}: {
  page: number
  where: WhereOptions<TipAttributes>
  attributes?: FindAttributeOptions
}): Promise<IFindAllTips> => {
  try {
    const limit = 12
    const offset = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.tip.findAndCountAll({
      where,
      attributes,
      offset,
      limit,
      order: [['id', 'DESC']],
      include: [
        {
          model: DataBase.instance.tipCategory,
          as: 'tip_category',
          required: true,
          attributes: ['id', 'category'],
        },
      ],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
export const findOneTip = async (where: WhereOptions<TipAttributes>): Promise<TipAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.tip.findOne({
        where,
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}
export const FilterTips = async (ids_tips: Array<number>, tip_category_id: number) => {
  try {
    const tips = await DataBase.instance.tip.findAll({
      where: {
        state: true,
        id: {
          [Op.in]: ids_tips,
        },
      },
      include: [
        {
          model: DataBase.instance.tipCategory,
          attributes: {
            exclude: ['updated_by', 'created_by', 'updated', 'created'],
          },
          where: {
            id: tip_category_id,
          },
        },
      ],
      attributes: {
        exclude: ['size', 'created_by', 'updated_by', 'updated', 'created', 'key', 'tip_category_id'],
      },
      logging: console.log,
    })

    return tips
  } catch (error) {
    throw error
  }
}

export const getFindIdsTips = async ({
  map_content_id_metrics,
  tip_category_id,
}: {
  map_content_id_metrics: any
  tip_category_id: number
}): Promise<TipAttributes[]> => {
  try {
    const tips: TipAttributes[] = await DataBase.instance.tip.findAll({
      where: {
        id: {
          [Op.in]: map_content_id_metrics,
        },
        tip_category_id,
      },
      attributes: ['id'],
    })
    return tips
  } catch (error) {
    throw error
  }
}
