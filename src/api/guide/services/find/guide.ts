import { FindAttributeOptions, Op, WhereOptions } from "sequelize";
import { DataBase } from "../../../../database";
import { GuideAttributes } from "../../models/guide.model";
import { TerraceAttributes } from "../../../terrace/models/terrace.model";

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

export const findGuideByName = async (
  searchTerm: string
): Promise<GuideAttributes[]> => {
  try {
    const guides = await DataBase.instance.guide.findAll({
      where: {
        [Op.or]: [
          { number_document: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
    return guides.map(guide => {
      const guideData = guide.get({ plain: true });
      return {
        ...guideData,
        textSearch: `${guideData.name || ''} ${guideData.lastname || ''} ${guideData.number_document || ''}`.trim()
      };
    });
  } catch (err) {
    throw err;
  }
};


export const allGuides = async (): Promise<GuideAttributes[]> => {
  try {
    const guides = await DataBase.instance.guide.findAll();
    return guides.map(guide => {
      const guideData = guide.get({ plain: true });
      return {
        ...guideData,
        textSearch: `${guideData.name || ''} ${guideData.lastname || ''} - ${guideData.number_document || ''} `.trim()
      };
    });
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
