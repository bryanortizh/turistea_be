import { DataBase } from "../../../../database";

export const createDriver = async ({
  name,
  lastname,
  email,
  cellphone,
  type_document,
  number_document,
  number_plate,
  brand_car,
  model_car,
  name_district,
  name_province,
  name_region,
  created_by,
  updated_by,
  state,
}: {
  name?: string;
  lastname?: string;
  email?: string;
  cellphone?: string;
  type_document?: string;
  number_document?: string;
  number_plate?: string;
  brand_car?: string;
  model_car?: string;
  name_district?: string;
  name_province?: string;
  name_region?: string;
  created_by?: number;
  updated_by?: number;
  state?: boolean;
}) => {
  try {
    return await DataBase.instance.drivers.create({
      name,
      lastname,
      email,
      cellphone,
      type_document,
      number_document,
      number_plate,
      brand_car,
      model_car,
      name_district,
      name_province,
      name_region,
      created_by,
      updated_by,
      state,
    });
  } catch (err) {
    throw err;
  }
};