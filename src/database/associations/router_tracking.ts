import { PackagesStatic } from "../../api/package/models/package.model";
import { RouterTrackingStatic } from "../../api/router_tracking/models/router_tracking.model";


export const routerTrackingBelongsToRouterPackage = ({
  routerTracking,
  routerPackage,
}: {
  routerTracking: RouterTrackingStatic;
  routerPackage: PackagesStatic;
}): void => {
  routerPackage.hasMany(routerTracking, {
    foreignKey: "id_package",
    sourceKey: "id",
  });
  routerTracking.belongsTo(routerPackage, {
    foreignKey: "id_package",
    targetKey: "id",
  });
}