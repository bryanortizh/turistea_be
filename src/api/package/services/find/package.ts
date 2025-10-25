import { FindAttributeOptions, WhereOptions } from "sequelize"
import { DataBase } from "../../../../database"
import { PackagesAttributes } from "../../models/package.model"

export const findAllPackages = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<PackagesAttributes>
  attributes?: FindAttributeOptions
  page: number
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.packages.findAndCountAll({
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

export const findOnePackage = async (
  where: WhereOptions<PackagesAttributes>
): Promise<PackagesAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.packages.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};