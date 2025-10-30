import { FindAttributeOptions, WhereOptions, Op } from "sequelize";
import { DriversAttributes } from "../../models/drivers.model";
import { DataBase } from "../../../../database";

export const findAllDrivers = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<DriversAttributes>;
  attributes?: FindAttributeOptions;
  page: number;
}) => {
  try {
    const limit: number = 12;
    const offset: number = 0 + (page - 1) * limit;
    const { count, rows } = await DataBase.instance.drivers.findAndCountAll({
      where,
      attributes,
      limit,
      offset,
      order: [["id", "ASC"]],
    });
    return { page, count, rows };
  } catch (err) {
    throw err;
  }
};

export const findDriverByName = async (
  searchTerm: string
): Promise<DriversAttributes[]> => {
  try {
    const drivers = await DataBase.instance.drivers.findAll({
      where: {
        [Op.or]: [
          { number_document: { [Op.like]: `%${searchTerm}%` } },
          { number_plate: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
    return drivers.map(driver => {
      const driverData = driver.get({ plain: true });
      return {
        ...driverData,
        textSearch: `${driverData.name || ''} ${driverData.lastname || ''} ${driverData.number_document || ''} - ${driverData.number_plate || ''}`.trim()
      };
    });
  } catch (err) {
    throw err;
  }
};

export const findOneDriver = async (
  where: WhereOptions<DriversAttributes>
): Promise<DriversAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.drivers.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};
