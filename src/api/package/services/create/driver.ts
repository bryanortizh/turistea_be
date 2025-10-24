import { DataBase } from "../../../../database";

export const createPackage = async ({
  title,
  description,
  key,
  size,
  path_bg,
  name_district,
  name_province,
  name_region,
  id_driver,
}: {
  title?: string;
  description?: string;
  key?: string;
  size?: string;
  path_bg?: string;
  name_district?: string;
  name_province?: string;
  name_region?: string;
  id_driver?: number;
}) => {
  try {
    return await DataBase.instance.packages.create({
      title,
      description,
      key,
      size,
      path_bg,
      name_district,
      name_province,
      name_region,
      id_driver,
    });
  } catch (err) {
    throw err;
  }
};
