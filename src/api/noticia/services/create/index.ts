import { DataBase } from "../../../../database";
import moment from "moment";
import { NoticiaAttributes } from "../../models/noticia.model";

export const createNoticia = async ({
  adminId,
  key,
  path,
  size,
  title,
  titular,
  code_departamento,
  code_provincia,
  ubigeo,
  name_departamento,
  name_provincia,
  name_distrito,
}: {
  adminId: number;
  key: string;
  path: string;
  size: string;
  title: string;
  titular: string;

  code_departamento: number;
  code_provincia: number;
  ubigeo: number;
  name_departamento?: string;
  name_provincia?: string;
  name_distrito?: string;
}): Promise<NoticiaAttributes> => {
  try {
    return await DataBase.instance.noticia.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      key,
      path,
      size,
      title,
      titular,
      code_departamento,
      code_provincia,
      ubigeo,
      name_departamento,
      name_provincia,
      name_distrito,
    });
  } catch (err) {
    throw err;
  }
};
