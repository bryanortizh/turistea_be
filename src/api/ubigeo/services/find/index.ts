import { FindAttributeOptions, WhereOptions } from "sequelize/types";
import { DataBase } from "../../../../database";
import { UbigeoTypeAttributes } from "../../models/ubigeo_map.model.model";
export const findOneColor = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<UbigeoTypeAttributes>;
  attributes?: FindAttributeOptions;
}) => {
  try {
    const role = await await DataBase.instance.ubigeoMap.findOne({
      where,
      attributes,
    });
    if (role) return role.get({ plain: true });
    return role;
  } catch (err) {
    throw err;
  }
};
export const findAllUbigeo = async () => {
  try {
    const _depv = await DataBase.instance.ubigeoMap.findAll({
      attributes: ["id", "departamento", "code_departamento"],
      group: ["code_departamento"],
      order: [["departamento", "ASC"]],
    });
    return _depv;
  } catch (err) {
    throw err;
  }
};

export const findAllUbigeoProvincia = async ({
  where,
  attributes,
}: {
  where: WhereOptions<UbigeoTypeAttributes>;
  attributes?: FindAttributeOptions;
}): Promise<any> => {
  try {
    const _prov = await DataBase.instance.ubigeoMap.findAll({
      where,
      attributes,

      order: [["provincia", "ASC"]],
      group: ["code_provincia"],
    });
    return _prov;
  } catch (err) {
    throw err;
  }
};
export const findAllUbigeoDistrito = async ({
  where,
  attributes,
}: {
  where: WhereOptions<UbigeoTypeAttributes>;
  attributes?: FindAttributeOptions;
}): Promise<any> => {
  try {
    const _prov = await DataBase.instance.ubigeoMap.findAll({
      where,
      attributes,

      order: [["distrito", "ASC"]],
    });
    return _prov;
  } catch (err) {
    throw err;
  }
};
