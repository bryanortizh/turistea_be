import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { updatePackageOne } from "../../user/services/update";
import { findOnePackage } from "./find/package";

export const registerPackageImageService = async ({
  image_document,
  image_car,
  packageId,
}: {
  image_document?: Buffer;
  image_car?: Buffer;
  packageId: number;
}) => {
  try {
    const pkg = await findOnePackage({ id: packageId, state: true });
    const oldKey = pkg?.key;

    let carBG: { key?: string; size?: string; path_bg?: string } = {};

    if (image_car) {
      const [, { key: carKey, size: carSize }] = await Promise.all([
        oldKey
          ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKey) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_car }),
      ]);

      carBG = {
        key: carKey,
        size: carSize,
        path_bg: config.PROY_BEURL + "/api/render-image/" + carKey,
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
