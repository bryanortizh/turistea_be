import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOneDriver } from "./find/driver";
import { updateDriverOne } from "./update/driver";

export const registerDriverImageService = async ({
  image_document,
  image_car,
  driverId,
}: {
  image_document?: Buffer;
  image_car?: Buffer;
  driverId: number;
}) => {
  try {
    const driver = await findOneDriver({ id: driverId, state: true });
    const oldKey = driver?.key;
    const oldKeyDocument = driver?.key_document;

    let carData: { key?: string; size?: string; path_car?: string } = {};
    let documentData: { key_document?: string; size_document?: string; path_document?: string } = {};

    if (image_car) {
      const [, { key: carKey, size: carSize }] = await Promise.all([
        oldKey ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKey) }) : Promise.resolve(),
        saveImageInServer({ buffer: image_car }),
      ]);
      
      carData = {
        key: carKey,
        size: carSize,
        path_car: config.PROY_BEURL + "/api/render-image/" + carKey,
      };
    }

    if (image_document) {
      const [, { key: docKey, size: docSize }] = await Promise.all([
        oldKeyDocument ? removeFile({ path: path.join(config.DIR_ASSETS!, oldKeyDocument) }) : Promise.resolve(),
        saveImageInServer({ buffer: image_document }),
      ]);
      
      documentData = {
        key_document: docKey,
        size_document: docSize,
        path_document: config.PROY_BEURL + "/api/render-image/" + docKey,
      };
    }

    await updateDriverOne({
      drivers: {
        ...carData,
        ...documentData,
      },
      where: {
        id: driverId,
      },
    });

    return { 
      path_car: carData.path_car || driver?.path_car,
      path_document: documentData.path_document || driver?.path_document,
      msg: "Imágenes actualizadas correctamente"
    };
  } catch (err) {
    throw err;
  }
};