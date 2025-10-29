import { FindAttributeOptions, WhereOptions } from "sequelize"
import { DataBase } from "../../../../database"
import { RouterTrackingAttributes } from "../../models/router_tracking.model"

export const findAllRouterTrackings = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<RouterTrackingAttributes>
  attributes?: FindAttributeOptions
  page: number
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.routerTracking.findAndCountAll({
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

export const findOneRouterTracking = async (
  where: WhereOptions<RouterTrackingAttributes>
): Promise<RouterTrackingAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.routerTracking.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};