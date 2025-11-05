import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOneGuide } from "./find/guide";
import { updateGuideOne } from "./update/guide";

export const registerGuideImageService = async ({
  image_document,
  image_photo,
  guideId,
}: {
  image_document?: Buffer;
  image_photo?: Buffer;
  guideId: number;
}) => {
  try {
    const guide = await findOneGuide({ id: guideId, state: true });
    const oldKey = guide?.key_photo;

    let carPhoto: { key_photo?: string; size_photo?: string; path_photo?: string } = {};

    if (image_photo) {
      const [, { key: photoKey, size: photoSize }] = await Promise.all([
        oldKey ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKey) }) : Promise.resolve(),
        saveImageInServer({ buffer: image_photo }),
      ]);
      
      carPhoto = {
        key_photo: photoKey,
        size_photo: photoSize,
        path_photo: config.PROY_BEURL + "/api/render-image/" + photoKey,
      };
    }


    await updateGuideOne({
      guide: {
        ...carPhoto,
      },
      where: {
        id: guideId,
      },
    });

    return { 
      path_photo: carPhoto.path_photo || guide?.path_photo,
      msg: "Imágenes actualizadas correctamente"
    };
  } catch (err) {
    throw err;
  }
};