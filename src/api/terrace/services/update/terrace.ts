import { DataBase } from "../../../../database";
import { TerraceAttributes } from "../../models/terrace.model";
import { WhereOptions } from "sequelize";

export const updateTerrace = async ({
  id,
  ...terrace
}: Partial<TerraceAttributes>): Promise<TerraceAttributes | null> => {
  try {
    const terraceExist = await DataBase.instance.terrace.findByPk(id);
    if (!terraceExist) throw new Error("Terramoza no encontrada");
    await DataBase.instance.terrace.update(terrace, {
      where: {
        id,
      },
    });
    return {
      ...terraceExist.toJSON(),
      ...terrace,
    };
  } catch (error) {
    throw error;
  }
};

export const updateTerraceOne = async ({
  where,
  terrace,
}: {
  where: WhereOptions<TerraceAttributes>;
  terrace: TerraceAttributes;
}): Promise<any> => {
  return await DataBase.instance.terrace.update({ ...terrace }, { where });
};