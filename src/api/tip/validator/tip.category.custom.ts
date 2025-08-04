import { Op } from 'sequelize'
import { findOneTipCategory } from '../services/find/tip.category'
export const notExistsTipCategory = async (category: string) => {
  const _category = await findOneTipCategory({
    where: {
      category: {
        [Op.like]: `%${category}`,
      },
    },
  })
  if (_category) throw new Error(`Ya existe la categoria`)
}
export const notExistsTipCategoryExcId = async (
  category: string,
  { req }: { req: any }
) => {
  const _category = await findOneTipCategory({
    where: {
      [Op.and]: {
        category,
        id: {
          [Op.not]: req.params.id,
        },
      },
    },
  })
  if (_category) throw new Error(`Ya existe la categoria`)
}
export const existsTipCategory = async (id: string | number) => {
  const _category = await findOneTipCategory({
    where: {
      id,
    },
  })
  if (!_category) throw new Error(`La categoria no existe`)
}
