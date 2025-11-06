import { DataBase } from "../../../../database";

export const createRouterTracking = async ({
  title,
  description,
  id_package,
  name_district,
  name_province,
  route_json,
  created_by,
  updated_by,
  created,
  updated,
}: {
  title?: string;
  description?: string;
  name_district?: string;
  name_province?: string;
  id_package?: number;
  route_json?: string;
  created_by?: number;
  updated_by?: number;
  created?: Date;
  updated?: Date;
}) => {
  try {
    return await DataBase.instance.routerTracking.create({
      title,
      description,
      id_package,
      name_district,
      name_province,
      route_json,
      created,
      updated,
      created_by,
      updated_by
    });
  } catch (err) {
    throw err;
  }
};
