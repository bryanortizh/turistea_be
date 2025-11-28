import { DataBase } from "../../../../database/index";
import { DriversAttributes } from "../../../drivers/models/drivers.model";
import { PackagesAttributes } from "../../../package/models/package.model";
import { UserAttributes } from "../../models/user.model";
import sequelize, { Op, WhereOptions } from "sequelize";
import { FindAttributeOptions, Order } from "sequelize";

export const findUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            email,
            state: true,
          },
        },
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};

export const findVerifyCodeVerificationUser = async ({
  email,
  code_verification,
}: {
  email: string;
  code_verification: string;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            email,
            code_verification,
          },
        },
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};

export const findVerifyStatusAndCodeVerificationUser = async ({
  email,
  code_verification,
  state,
}: {
  email: string;
  code_verification: string;
  state: boolean;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            email,
            code_verification,
            state,
          },
        },
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};

export const findUserByEmailWithoutState = async ({
  email,
}: {
  email: string;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          /*
            STATE SE VALIDA LUEGO DE QUE SU CONTRASEÑA ES CORRECTA , PARA LUEGO VALIDAR SI EL
            CORREO ES VALIDO O NO
          */
          email,
        },
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};

export const findUserByDni = async ({
  dni,
}: {
  dni: number;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            dni,
            state: true,
          },
        },
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};

export const findOneUser = async (
  where: WhereOptions<UserAttributes>
): Promise<UserAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};

export const findAllPackage = async () => {
  try {
    const packages = await DataBase.instance.packages.findAll({
      where: { state: true },
      include: [
        {
          model: DataBase.instance.routerTracking,
          attributes: ["name_district", "name_province"],
          required: false,
          where: { state: true },
        },
      ],
    });

    // Map result to include name_district and name_province in the package object
    const mapped = (packages || []).map((pkg: any) => {
      const plain = pkg.toJSON ? pkg.toJSON() : pkg;

      // possible include keys depending on association alias and `as` usage
      const routerKeys = [
        "router_trackings",
        "routerTrackings",
        "router_tracking",
        "routerTracking",
      ];

      let rt: any = null;
      for (const key of routerKeys) {
        if (plain[key]) {
          rt = plain[key];
          break;
        }
      }

      // If the association is hasMany, rt may be an array
      let name_district = null;
      let name_province = null;
      if (Array.isArray(rt) && rt.length > 0) {
        name_district = rt[0].name_district || null;
        name_province = rt[0].name_province || null;
      } else if (rt) {
        name_district = rt.name_district || null;
        name_province = rt.name_province || null;
      }

      // Remove the nested router_tracking property (fix: don't return as separate object)
      for (const key of routerKeys) {
        if (plain[key]) {
          delete plain[key];
        }
      }

      return {
        ...plain,
        name_district,
        name_province,
      };
    });

    return mapped;
  } catch (err) {
    throw err;
  }
};

export const findUserById = async ({
  id,
  attributes,
}: {
  id: number;
  attributes?: FindAttributeOptions;
}): Promise<UserAttributes> => {
  try {
    return (
      await DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            id,
            state: true,
          },
        },
        attributes,
      })
    )?.get({ plain: true })!;
  } catch (err) {
    throw err;
  }
};
export const findAllUsers = async ({
  page,
  where,
  attributes,
  order,
}: {
  page: number;
  where?: WhereOptions<UserAttributes>;
  attributes?: FindAttributeOptions;
  order: Order;
}) => {
  try {
    const limit: number = 12;
    const offset: number = 0 + (page - 1) * limit;
    const { count, rows } = await DataBase.instance.user.findAndCountAll({
      where,
      attributes,
      order,
      limit,
      offset,
    });
    return { page, count, rows };
  } catch (err) {
    throw err;
  }
};

export const SearchUser = async ({
  regex,
  order,
}: {
  regex?: string;
  order: Order;
}) => {
  try {
    const limit: number = 12;
    const where: any = {
      state: true,
    };

    if (regex) {
      where[Op.or] = [
        { name: { [Op.regexp]: regex } },
        { lastname: { [Op.regexp]: regex } },
      ];
      // Only add id and dni if they are strings in your DB, otherwise skip them
      // If you want to search numeric fields, consider using Op.like or Op.eq with parsed numbers
    }

    const users = await DataBase.instance.user.findAll({
      where,
      attributes: {
        exclude: [
          "password",
          "salt",
          "status",
          "numIntentos",
          "fechaFinBloqueo",
          "hora_bloqueo",
          "cantidad_min_bloqueado",
          "nightmode",
          "state",
          "device_id",
          "ext",
          "path",
          "number_of_sessions",
          "updated",
          "created",
          "code_verification",
          "size",
          "filename",
          "date_user_session_day",
        ],
      },
      order,
      limit,
    });
    return users;
  } catch (err) {
    throw err;
  }
};

export const findAllUsersRecordType = async ({
  where,
  attributes,
  order,
}: {
  where?: WhereOptions<UserAttributes>;
  attributes?: FindAttributeOptions;
  order: Order;
}) => {
  try {
    const listRecordType = await DataBase.instance.user.findAll({
      where,
      attributes,
      order,
      group: ["origin"],
      // logging:console.log
    });
    return listRecordType;
  } catch (err) {
    throw err;
  }
};

export const findAllUsersRangeAge = async () => {
  try {
    const listRangeAge = await DataBase.instance.user.findAll({
      attributes: [
        [
          sequelize.literal(`CASE WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) < 20 THEN 'I) <20' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 20 AND 29 THEN 'II) 20-29' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 30 AND 39 THEN 'III) 30-39' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 40 AND 49 THEN 'IV) 40-49' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 50 AND 59 THEN 'V) 50-59' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 60 AND 69 THEN 'VI) 60-69' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 70 AND 79 THEN 'VII) 70-79' ELSE 'VIII) 80>' END`),
          "range_age",
        ],
        [
          sequelize.literal(`COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) < 20 THEN 'I) <20' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 20 AND 29 THEN 'II) 20-29' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 30 AND 39 THEN 'III) 30-39' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 40 AND 49 THEN 'IV) 40-49' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 50 AND 59 THEN 'V) 50-59' WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 60 AND 69 THEN 'VI) 60-69' 
        WHEN TIMESTAMPDIFF(YEAR, date_of_birth , CURRENT_TIMESTAMP()) BETWEEN 70 AND 79 THEN 'VII) 70-79' ELSE 'VIII) 80>' END)`),
          "cantidad",
        ],
      ],
      order: [[sequelize.literal("range_age"), "ASC"]],
      group: ["range_age"],
      // logging:console.log
    });
    return listRangeAge;
  } catch (err) {
    throw err;
  }
};

export const findAllUsersReport = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<UserAttributes>;
  attributes?: FindAttributeOptions;
}) => {
  try {
    const users = await DataBase.instance.user.findAll({
      where,
      attributes,
      logging: console.log,
    });
    let copy_list = JSON.parse(JSON.stringify(users));
    return copy_list;
  } catch (err) {
    throw err;
  }
};
