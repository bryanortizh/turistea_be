import { removeFile } from "../../../shared/remove.file";
import { saveImageInServer } from "../../../shared/save.file";
import config from "../../../config/environments";
import path from "path";
import { findOneRouterTracking } from "./find/router_tracking";
import { updateRouterTrackingOne } from "./update/router_tracking";

export const registerRouterTrackingImageService = async ({
  image_one,
  image_two,
  image_tree,
  routerTrackingId,
}: {
  image_one?: Buffer;
  image_two?: Buffer;
  image_tree?: Buffer;
  routerTrackingId: number;
}) => {
  try {
    const routerTracking = await findOneRouterTracking({
      id: routerTrackingId,
      state: true,
    });
    const KeyOne = routerTracking?.key_bgone;
    const KeyTwo = routerTracking?.key_bgtwo;
    const KeyThree = routerTracking?.key_bgthree;

    let carOne: { key_bgone?: string; size_bgone?: string; path_bgone?: string } =
      {};
    let carTwo: { key_bgtwo?: string; size_bgtwo?: string; path_bgtwo?: string } =
      {};
    let carThree: {
      key_bgthree?: string;
      size_bgthree?: string;
      path_bgthree?: string;
    } = {};

    if (image_one) {
      const [, { key: oneKey, size: oneSize }] = await Promise.all([
        KeyOne
          ? removeFile({ path: path.join(config.DIR_ASSETS!, KeyOne) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_one }),
      ]);

      carOne = {
        key_bgone: oneKey,
        size_bgone: oneSize,
        path_bgone: config.PROY_BEURL + "/api/render-image/" + oneKey,
      };
    }

    if (image_two) {
      const [, { key: twoKey, size: twoSize }] = await Promise.all([
        KeyTwo
          ? removeFile({ path: path.join(config.DIR_ASSETS!, KeyTwo) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_two }),
      ]);

      carTwo = {
        key_bgtwo: twoKey,
        size_bgtwo: twoSize,
        path_bgtwo: config.PROY_BEURL + "/api/render-image/" + twoKey,
      };
    }
    if (image_tree) {
      const [, { key: threeKey, size: threeSize }] = await Promise.all([
        KeyThree
          ? removeFile({ path: path.join(config.DIR_ASSETS!, KeyThree) })
          : Promise.resolve(),
        saveImageInServer({ buffer: image_tree }),
      ]);
      carThree = {
        key_bgthree: threeKey,
        size_bgthree: threeSize,
        path_bgthree: config.PROY_BEURL + "/api/render-image/" + threeKey,
      };
    }

    await updateRouterTrackingOne({
      routerTracking: {
        ...carOne,
        ...carTwo,
        ...carThree,
      },
      where: {
        id: routerTrackingId,
      },
    });

    return {
      path_one: carOne.path_bgone || routerTracking?.path_bgone,
      path_two: carTwo.path_bgtwo || routerTracking?.path_bgtwo,
      path_three: carThree.path_bgthree || routerTracking?.path_bgthree,
      msg: "Imágenes actualizadas correctamente",
    };
  } catch (err) {
    throw err;
  }
};
