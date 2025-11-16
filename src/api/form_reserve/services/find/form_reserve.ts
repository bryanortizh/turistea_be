import { FindAttributeOptions, WhereOptions } from "sequelize";
import { DataBase } from "../../../../database";
import { FormModelReserveAttributes } from "../../model/form_reserve.model";

export const findAllFormReserve = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<FormModelReserveAttributes>;
  attributes?: FindAttributeOptions;
  page: number;
}) => {
  try {
    const limit: number = 12;
    const offset: number = 0 + (page - 1) * limit;
    const { count, rows } = await DataBase.instance.formReserve.findAndCountAll({
      where,
      attributes,
      limit,
      offset,
      order: [["id", "DESC"]],
      include: [
        { model: DataBase.instance.user, as: 'user' },
        { 
          model: DataBase.instance.packages, 
          as: 'package',
          include: [
            { model: DataBase.instance.drivers, as: 'driver' },
            { model: DataBase.instance.guide, as: 'guide' },
            { model: DataBase.instance.terrace, as: 'terrace' },
          ]
        },
        { model: DataBase.instance.routerTracking, as: 'router_tracking' },
      ],
    });
    return { page, count, rows };
  } catch (err) {
    throw err;
  }
};

export const findOneFormReserve = async (
  where: WhereOptions<FormModelReserveAttributes>
): Promise<FormModelReserveAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.formReserve.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};