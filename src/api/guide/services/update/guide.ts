import { DataBase } from "../../../../database";
import { GuideAttributes } from "../../models/guide.model";
import { WhereOptions } from "sequelize";

export const updateGuide = async ({
  id,
  ...guide
}: Partial<GuideAttributes>): Promise<GuideAttributes | null> => {
  try {
    const guideExist = await DataBase.instance.guide.findByPk(id);
    if (!guideExist) throw new Error("Guía no encontrada");
    await DataBase.instance.guide.update(guide, {
      where: {
        id,
      },
    });
    return {
      ...guideExist.toJSON(),
      ...guide,
    };
  } catch (error) {
    throw error;
  }
};

export const updateGuideOne = async ({
  where,
  guide,
}: {
  where: WhereOptions<GuideAttributes>;
  guide: GuideAttributes;
}): Promise<any> => {
  return await DataBase.instance.guide.update({ ...guide }, { where });
};
