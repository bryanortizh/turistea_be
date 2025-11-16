import { WhereOptions } from "sequelize";
import { DataBase } from "../../../../database";
import { RouterTrackingAttributes } from "../../models/router_tracking.model";

export const updateRouterTracking = async ({
  id,
  ...routerTracking
}: Partial<RouterTrackingAttributes>): Promise<RouterTrackingAttributes | null> => {
  try {
    const packageExist = await DataBase.instance.routerTracking.findByPk(id);
    if (!packageExist) throw new Error("Ruta de Tracking no encontrado");
    await DataBase.instance.routerTracking.update(routerTracking, {
      where: {
        id,
      },
    });
    return {
      ...packageExist.toJSON(),
      ...routerTracking,
    };
  } catch (error) {
    throw error;
  }
};


export const updateRouterTrackingOne = async ({
  where,
  routerTracking,
}: {
  where: WhereOptions<RouterTrackingAttributes>;
  routerTracking: RouterTrackingAttributes;
}): Promise<any> => {
  return await DataBase.instance.routerTracking.update({ ...routerTracking }, { where });
};
