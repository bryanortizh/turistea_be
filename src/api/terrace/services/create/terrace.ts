import { DataBase } from "../../../../database";

export const createTerrace = async ({
  name,
  lastname,
  email,
  type_document,
  number_document,
  cellphone,
  sexo,
  state,
  created_by,
  updated_by,
  created,
  updated,
}: {
  name?: string;
  lastname?: string;
  email?: string;
  type_document?: string;
  number_document?: string;
  cellphone?: string;
  sexo?: string;
  state?: boolean;
  created_by?: number;
  updated_by?: number;
  created?: Date;
  updated?: Date;
}) => {
  try {
    return await DataBase.instance.terrace.create({
      name,
      lastname,
      email,
      type_document,
      number_document,
      cellphone,
      state,
      sexo,
      created_by,
      updated_by,
      created,
      updated,
    });
  } catch (err) {
    throw err;
  }
};