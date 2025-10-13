import { FindAttributeOptions, WhereOptions } from "sequelize"
import { DriversAttributes } from "../../models/drivers.model"
import { DataBase } from "../../../../database"

export const findAllDrivers = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<DriversAttributes>
  attributes?: FindAttributeOptions
  page: number
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.drivers.findAndCountAll({
      where,
      attributes,
      limit,
      offset,
      order: [['id', 'ASC']],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
