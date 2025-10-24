import { DriversStatic } from "../../api/drivers/models/drivers.model";
import { PackagesStatic } from "../../api/package/models/package.model";

export const driverHasManyPackages = ({
  package: pkg,
  driver,
}: {
  package: PackagesStatic;
  driver: DriversStatic;
}): void => {
  driver.hasMany(pkg, {
    foreignKey: "id_driver",
    sourceKey: "id",
  });
  pkg.belongsTo(driver, {
    foreignKey: "id_driver",
    targetKey: "id",
  });
};
