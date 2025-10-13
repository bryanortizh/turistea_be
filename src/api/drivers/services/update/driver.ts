import { DataBase } from "../../../../database";
import { DriversAttributes } from "../../models/drivers.model";

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
    console.error(error);
    throw error;
  }
};