import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOneTerrace } from "./find/terrace";
import { updateTerraceOne } from "./update/terrace";

export const registerTerraceImageService = async ({
  image_document,
  image_photo,
  terraceId,
}: {
  image_document?: Buffer;
  image_photo?: Buffer;
  terraceId: number;
}) => {
  try {
    const terrace = await findOneTerrace({ id: terraceId, state: true });
    const oldKey = terrace?.key_photo;
    const oldKeyDocument = terrace?.key_document;

    let carPhoto: { key_photo?: string; size_photo?: string; path_photo?: string } = {};
    let documentData: { key_document?: string; size_document?: string; path_document?: string } = {};

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

    await updateTerraceOne({
      terrace: {
        ...carPhoto,
        ...documentData,
      },
      where: {
        id: terraceId,
      },
    });

    return { 
      path_photo: carPhoto.path_photo || terrace?.path_photo,
      path_document: documentData.path_document || terrace?.path_document,
      msg: "Imágenes actualizadas correctamente"
    };
  } catch (err) {
    throw err;
  }
};