import path from "path";
import { DataBase } from "../../../../database";
import { removeFile } from "../../../../shared/remove.file";
import { saveImageInServer } from "../../../../shared/save.file";
import config from "../../../../config/environments";
import { PackagesAttributes } from "../../models/package.model";
import { updatePackageOne } from "../../../user/services/update";
import { findOnePackage } from "../find/package";

export const updatePackage = async ({
  id,
  ...driver
}: Partial<PackagesAttributes>): Promise<PackagesAttributes | null> => {
  try {
    const packageExist = await DataBase.instance.packages.findByPk(id);
    if (!packageExist) throw new Error("Conductor no encontrado");
    await DataBase.instance.drivers.update(driver, {
      where: {
        id,
      },
    });
    return {
      ...packageExist.toJSON(),
      ...driver,
    };
  } catch (error) {
    throw error;
  }
};

export const registerPackageImageService = async ({
  image,
  packageId,
}: {
  image: Buffer;
  packageId: number;
}) => {
  try {
    const _key = (await findOnePackage({ id: packageId, state: true }))?.key;
    const [result, { key, size }] = await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, _key || "") }),
      saveImageInServer({ buffer: image }),
    ]);
    const _path_bg = config.PROY_BEURL + "/api/render-image/" + key;
    await updatePackageOne({
      pkg: {
        key,
        size,
        path_bg: _path_bg,
      },
      where: {
        id: packageId,
      },
    });
    return { path: _path_bg, msg: result };
  } catch (err) {
    throw err;
  }
};
