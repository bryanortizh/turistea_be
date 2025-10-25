import path from "path";
import { DataBase } from "../../../../database";
import { removeFile } from "../../../../shared/remove.file";
import { saveImageInServer } from "../../../../shared/save.file";
import config from "../../../../config/environments";
import { updateDriverOne } from "../../../user/services/update";
import { GuideAttributes } from "../../models/guide.model";
import { findOneGuide } from "../find/guide";

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
    console.error(error);
    throw error;
  }
};

export const registerGuideImageService = async ({
  image,
  guideId,
}: {
  image: Buffer;
  guideId: number;
}) => {
  try {
    const _key = (await findOneGuide({ id: guideId, state: true }))?.key_document;
    const [result, { key, size }] = await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, _key || "") }),
      saveImageInServer({ buffer: image }),
    ]);
    const _path_car = config.PROY_BEURL + "/api/render-image/" + key;
    await updateDriverOne({
      drivers: {
        key,
        size,
        path_car: _path_car,
      },
      where: {
        id: guideId,
      },
    });
    return { path: _path_car, msg: result };
  } catch (err) {
    throw err;
  }
};