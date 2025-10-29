import { DataBase } from "../../../../database";
import { PackagesAttributes } from "../../models/package.model";
import { WhereOptions } from "sequelize";

export const updatePackage = async ({
  id,
  ...driver
}: Partial<PackagesAttributes>): Promise<PackagesAttributes | null> => {
  try {
    const packageExist = await DataBase.instance.packages.findByPk(id);
    if (!packageExist) throw new Error("Paquete no encontrado");
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

export const updatePackageOne = async ({
  where,
  pkg,
}: {
  where: WhereOptions<PackagesAttributes>;
  pkg: PackagesAttributes;
}): Promise<any> => {
  return await DataBase.instance.packages.update(
    { ...pkg },
    {
      where,
    }
  );
};

