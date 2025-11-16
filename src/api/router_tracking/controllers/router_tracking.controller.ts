import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { IToken } from "../../auth/passport/passport";
import { findAllRouterTrackings } from "../services/find/router_tracking";
import { createRouterTracking } from "../services/create/router_tracking";
import { registerRouterTrackingImageService } from "../services/router_tracking.service";
import { updateRouterTracking } from "../services/update/router_tracking";

export const findAllRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllRouterTrackings({
      page: Number(req.query.page),
      where: {
        id_package: req.params.id,
        state: Number(req.query.state),
      },
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const createRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    // Procesar route_json si contiene bg_image
    let processedRouteJson = req.body.route_json;
    
    if (req.body.route_json) {
      try {
        const routeData = JSON.parse(req.body.route_json);
        
        // Verificar si es un array de objetos
        if (Array.isArray(routeData)) {
          
          // Procesar cada objeto en el array
          for (let i = 0; i < routeData.length; i++) {
            const routeItem = routeData[i];
            
            if (routeItem.bg_image && routeItem.bg_image.startsWith('data:image/')) {
              
              // Extraer la imagen de fondo del JSON
              const base64BgImage = routeItem.bg_image.replace(
                /^data:image\/[a-z]+;base64,/,
                ""
              );
              
              // Convertir a buffer y guardar la imagen
              const bgImageBuffer = Buffer.from(base64BgImage, "base64");
              const { saveImageInServer } = await import("../../../shared/save.file");
              const config = await import("../../../config/environments");
              
              const { key, size } = await saveImageInServer({ buffer: bgImageBuffer });
              const imageUrl = config.default.PROY_BEURL + "/api/render-image/" + key;
              
              // Reemplazar bg_image con la URL y agregar metadata
              routeData[i] = {
                ...routeItem,
                bg_image: imageUrl,
                bg_image_key: key,
                bg_image_size: size
              };
              
            }
          }
          
          processedRouteJson = JSON.stringify(routeData);
        }
        // Si no es array, manejar como objeto simple (compatibilidad hacia atrás)
        else if (routeData.bg_image && routeData.bg_image.startsWith('data:image/')) {
          
          const base64BgImage = routeData.bg_image.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          
          const bgImageBuffer = Buffer.from(base64BgImage, "base64");
          const { saveImageInServer } = await import("../../../shared/save.file");
          const config = await import("../../../config/environments");
          
          const { key, size } = await saveImageInServer({ buffer: bgImageBuffer });
          const imageUrl = config.default.PROY_BEURL + "/api/render-image/" + key;
          
          routeData.bg_image = imageUrl;
          routeData.bg_image_key = key;
          routeData.bg_image_size = size;
          
          processedRouteJson = JSON.stringify(routeData);
        }
      } catch (error) {
        console.error("Error processing route_json:", error);
      }
    }

    const pkg = await createRouterTracking({
      ...req.body,
      route_json: processedRouteJson,
      created_by: user.userId,
      updated_by: user.userId,
      state: true,
    });
    let imagen = {};

    if (req.body.image_one && req.body.image_two && req.body.image_tree) {
      const base64DataOne = req.body.image_one.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataTwo = req.body.image_two.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataThree = req.body.image_tree.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerRouterTrackingImageService({
        image_one: Buffer.from(base64DataOne, "base64"),
        image_two: Buffer.from(base64DataTwo, "base64"),
        image_tree: Buffer.from(base64DataThree, "base64"),
        routerTrackingId: pkg.id!,
      });
    }

    res.status(200).json({
      ...pkg,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updateRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    // Procesar route_json si contiene bg_image
    let processedRouteJson = req.body.route_json;
    
    if (req.body.route_json) {
      try {
        const routeData = JSON.parse(req.body.route_json);
        
        // Verificar si es un array de objetos
        if (Array.isArray(routeData)) {
          
          // Procesar cada objeto en el array
          for (let i = 0; i < routeData.length; i++) {
            const routeItem = routeData[i];
            
            if (routeItem.bg_image && routeItem.bg_image.startsWith('data:image/')) {
              
              // Extraer la imagen de fondo del JSON
              const base64BgImage = routeItem.bg_image.replace(
                /^data:image\/[a-z]+;base64,/,
                ""
              );
              
              // Convertir a buffer y guardar la imagen
              const bgImageBuffer = Buffer.from(base64BgImage, "base64");
              const { saveImageInServer } = await import("../../../shared/save.file");
              const config = await import("../../../config/environments");
              
              const { key, size } = await saveImageInServer({ buffer: bgImageBuffer });
              const imageUrl = config.default.PROY_BEURL + "/api/render-image/" + key;
              
              // Reemplazar bg_image con la URL y agregar metadata
              routeData[i] = {
                ...routeItem,
                bg_image: imageUrl,
                bg_image_key: key,
                bg_image_size: size
              };
              
              
            }
          }
          
          processedRouteJson = JSON.stringify(routeData);
        }
        // Si no es array, manejar como objeto simple (compatibilidad hacia atrás)
        else if (routeData.bg_image && routeData.bg_image.startsWith('data:image/')) {
          
          const base64BgImage = routeData.bg_image.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          
          const bgImageBuffer = Buffer.from(base64BgImage, "base64");
          const { saveImageInServer } = await import("../../../shared/save.file");
          const config = await import("../../../config/environments");
          
          const { key, size } = await saveImageInServer({ buffer: bgImageBuffer });
          const imageUrl = config.default.PROY_BEURL + "/api/render-image/" + key;
          
          routeData.bg_image = imageUrl;
          routeData.bg_image_key = key;
          routeData.bg_image_size = size;
          
          processedRouteJson = JSON.stringify(routeData);
        }
      } catch (error) {
        console.error("Update - Error processing route_json:", error);
      }
    }

    let imagen = {};

    if (req.body.image_one && req.body.image_two && req.body.image_tree) {
      const base64DataOne = req.body.image_one.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataTwo = req.body.image_two.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataThree = req.body.image_tree.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerRouterTrackingImageService({
        image_one: Buffer.from(base64DataOne, "base64"),
        image_two: Buffer.from(base64DataTwo, "base64"),
        image_tree: Buffer.from(base64DataThree, "base64"),
        routerTrackingId: req.params.id as unknown as number,
      });
    }

    const pkg = await updateRouterTracking({
      ...req.body,
      route_json: processedRouteJson,
      updated_by: user.userId,
      id: Number(req.params.id),
    });

    res.status(200).json({
      ...pkg,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const inactiveRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const pkg = await updateRouterTracking({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    });
    res.status(200).json(pkg);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
