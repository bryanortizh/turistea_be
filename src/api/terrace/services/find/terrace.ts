import { FindAttributeOptions, Op, WhereOptions } from "sequelize";
import { DataBase } from "../../../../database";
import { TerraceAttributes } from "../../models/terrace.model";

export const findAllTerrace = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<TerraceAttributes>;
  attributes?: FindAttributeOptions;
  page: number;
}) => {
  try {
    const limit: number = 12;
    const offset: number = 0 + (page - 1) * limit;
    const { count, rows } = await DataBase.instance.terrace.findAndCountAll({
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

export const allTerraces = async (): Promise<TerraceAttributes[]> => {
  try {
    const terraces = await DataBase.instance.terrace.findAll();
    return terraces.map(terrace => {
      const terraceData = terrace.get({ plain: true });
      return {
        ...terraceData,
        textSearch: `${terraceData.name || ''} ${terraceData.lastname || ''} - ${terraceData.number_document || ''} `.trim()
      };
    });
  } catch (err) {
    throw err;
  }
};

export const findTerraceByName = async (
  searchTerm: string
): Promise<TerraceAttributes[]> => {
  try {
    const drivers = await DataBase.instance.terrace.findAll({
      where: {
        [Op.or]: [
          { number_document: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
    return drivers.map(driver => {
      const driverData = driver.get({ plain: true });
      return {
        ...driverData,
        textSearch: `${driverData.name || ''} ${driverData.lastname || ''} ${driverData.number_document || ''}`.trim()
      };
    });
  } catch (err) {
    throw err;
  }
};

export const findOneTerrace = async (
  where: WhereOptions<TerraceAttributes>
): Promise<TerraceAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.terrace.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};