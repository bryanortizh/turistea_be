import { DataBase } from "../../../../database";
import moment from "moment";

export const updateNoticia = async ({
  id,
  title,
  titular,
  state,
  key,
  path,
  size,
  adminId,
  code_departamento,
  code_provincia,
  ubigeo,
  name_departamento,
  name_provincia,
  name_distrito,
}: {
  id: number;
  title?: string;
  titular?: string;
  state?: boolean;
  key?: string;
  path?: string;
  size?: string;
  adminId: number;
  code_departamento?: number;
  code_provincia?: number;

  ubigeo?: number;
  name_departamento?: string;
  name_provincia?: string;
  name_distrito?: string;
}) => {
  try {
    return await DataBase.instance.noticia.update(
      {
        title,
        titular,
        updated: moment.utc().toDate(),
        updated_by: adminId,
        state,
        key,
        path,
        size,
        code_departamento,
        code_provincia,
        ubigeo,
        name_departamento,
        name_provincia,
        name_distrito,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};
