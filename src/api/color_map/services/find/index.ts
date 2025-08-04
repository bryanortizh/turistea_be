import { FindAttributeOptions, WhereOptions } from 'sequelize/types'
import { DataBase } from '../../../../database'
import { ColorTypeAttributes } from '../../models/color_map.model.model'
export const findOneColor = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<ColorTypeAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const role = await await DataBase.instance.colorMap.findOne({
      where,
      attributes,
    })
    if (role) return role.get({ plain: true })
    return role
  } catch (err) {
    throw err
  }
}
export const findAllColors = async () => {
  try {
    return await DataBase.instance.colorMap.findAll()
  } catch (err) {
    throw err
  }
}
