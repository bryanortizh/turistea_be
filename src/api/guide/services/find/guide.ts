import { FindAttributeOptions, WhereOptions } from "sequelize";
import { DataBase } from "../../../../database";
import { GuideAttributes } from "../../models/guide.model";

export const findAllGuide = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<GuideAttributes>;
  attributes?: FindAttributeOptions;
  page: number;
}) => {
  try {
    const limit: number = 12;
    const offset: number = 0 + (page - 1) * limit;
    const { count, rows } = await DataBase.instance.guide.findAndCountAll({
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

export const findOneGuide = async (
  where: WhereOptions<GuideAttributes>
): Promise<GuideAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.guide.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};
