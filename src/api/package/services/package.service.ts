import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOnePackage } from "./find/package";
import { updatePackageOne } from "./update/package";

export const registerPackageImageService = async ({
  image_bg,
  packageId,
}: {
  image_bg?: Buffer;
  packageId: number;
}) => {
  try {
    const pkg = await findOnePackage({ id: packageId, state: true });
    const oldKey = pkg?.key;

    let carBG: { key?: string; size?: string; path_bg?: string } = {};

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

    await updatePackageOne({
      pkg: {
        ...carBG,
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
