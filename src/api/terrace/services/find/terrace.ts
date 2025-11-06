import { FindAttributeOptions, WhereOptions } from "sequelize";
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