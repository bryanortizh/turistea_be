import { DataBase } from "../../../../database";

export const createPackage = async ({
  title,
  description,
  name_region,
  id_driver,
  created_by,
  updated_by,
  created,
  updated,
}: {
  title?: string;
  description?: string;
  name_region?: string;
  id_driver?: number;
  created_by?: number;
  updated_by?: number;
  created?: Date;
  updated?: Date;
}) => {
  try {
    return await DataBase.instance.packages.create({
      title,
      description,
      name_region,
      id_driver,
      created,
      updated,
      created_by,
      updated_by
    });
  } catch (err) {
    throw err;
  }
};
