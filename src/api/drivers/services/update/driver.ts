import path from "path";
import { DataBase } from "../../../../database";
import { removeFile } from "../../../../shared/remove.file";
import { DriversAttributes } from "../../models/drivers.model";
import { saveImageInServer } from "../../../../shared/save.file";
import config from "../../../../config/environments";
import { updateDriverOne } from "../../../user/services/update";
import { findOneDriver } from "../find/driver";

export const updateDriver = async ({
  id,
  ...driver
}: Partial<DriversAttributes>): Promise<DriversAttributes | null> => {
  try {
    const driverExist = await DataBase.instance.drivers.findByPk(id);
    if (!driverExist) throw new Error("Conductor no encontrado");
    await DataBase.instance.drivers.update(driver, {
      where: {
        id,
      },
    });
    return {
      ...driverExist.toJSON(),
      ...driver,
    };
  } catch (error) {
    throw error;
  }
};

export const registerDriverImageService = async ({
  image,
  driverId,
}: {
  image: Buffer;
  driverId: number;
}) => {
  try {
    const _key = (await findOneDriver({ id: driverId, state: true }))?.key;
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
        id: driverId,
      },
    });
    return { path: _path_car, msg: result };
  } catch (err) {
    throw err;
  }
};
