import { FormReserveStatic } from "../../api/form_reserve/model/form_reserve.model";
import { PackagesStatic } from "../../api/package/models/package.model";
import { UserStatic } from "../../api/user/models/user.model";

export const formReserveBelongsToClient = ({
  formReserve,
  user,
}: {
  formReserve: FormReserveStatic;
  user: UserStatic;
}) => {
  formReserve.belongsTo(user, {
    foreignKey: "id_user",
    targetKey: "id",
  });
  user.hasMany(formReserve, {
    foreignKey: "id_user",
    sourceKey: "id",
  });
};

export const formReserveBellongToIdPackage = ({
  formReserve,
  pkg,
}: {
  formReserve: FormReserveStatic;
  pkg: PackagesStatic;
}) => {
  pkg.hasMany(formReserve, {
    foreignKey: "id_package",
    sourceKey: "id",
  });
  formReserve.belongsTo(pkg, {
    foreignKey: "id_package",
    targetKey: "id",
  });
};

export const formReserveBelongToIdRouterTrackign = ({
  formReserve,
  routerTracking,
}: {
  formReserve: FormReserveStatic;
  routerTracking: PackagesStatic;
}) => {
  routerTracking.hasMany(formReserve, {
    foreignKey: "id_router_tracking",
    sourceKey: "id",
  });
  formReserve.belongsTo(routerTracking, {
    foreignKey: "id_router_tracking",
    targetKey: "id",
  });
};
