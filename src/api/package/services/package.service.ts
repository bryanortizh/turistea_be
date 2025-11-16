import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOnePackage } from "./find/package";
import { updatePackageOne } from "./update/package";

export const registerPackageImageService = async ({
  image_bg,
  image_bg_two,
  packageId,
}: {
  image_bg?: Buffer;
  image_bg_two?: Buffer;
  packageId: number;
}) => {
  try {
    const pkg = await findOnePackage({ id: packageId, state: true });
    const oldKey = pkg?.key;
    const oldKeyTwo = pkg?.key_two;

    let carBG: { key?: string; size?: string; path_bg?: string } = {};
    let carBGTwo: { key_two?: string; size_two?: string; path_bg_two?: string } = {};

    if (image_bg) {
      const [, { key: bgKey, size: bgSize }] = await Promise.all([
        oldKey
          ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKey) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_bg }),
      ]);

      carBG = {
        key: bgKey,
        size: bgSize,
        path_bg: config.PROY_BEURL + "/api/render-image/" + bgKey,
      };
    }
    if (image_bg_two) {
      const [, { key: bgKeyTwo, size: bgSizeTwo }] = await Promise.all([
        oldKeyTwo
          ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKeyTwo) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_bg_two }),
      ]);

      carBGTwo = {
        key_two: bgKeyTwo,
        size_two: bgSizeTwo,
        path_bg_two: config.PROY_BEURL + "/api/render-image/" + bgKeyTwo,
      };
    }

    await updatePackageOne({
      pkg: {
        ...carBG,
        ...carBGTwo,
      },
      where: {
        id: packageId,
      },
    });

    return {
      path_bg: carBG.path_bg || pkg?.path_bg,
      msg: "Imágenes actualizadas correctamente",
    };
  } catch (err) {
    throw err;
  }
};
