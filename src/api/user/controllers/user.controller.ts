import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import {
  findAllUsers,
  findUserById,
  findAllUsersRecordType,
  findAllUsersRangeAge,
  SearchUser,
  findAllPackage,
} from "../services/find/index";
import sequelize, { Op } from "sequelize";
import { updateIdDevice, updateUser } from "../services/update";
import { IToken } from "../../auth/passport/passport";
import moment from "moment";
import {
  updateImagePerfilService,
  updatePasswordUserService,
} from "../services/user.service";
import { findOneDriver } from "../../drivers/services/find/driver";
import { findOneGuide } from "../../guide/services/find/guide";
import { DataBase } from "../../../database";

export const findAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllUsers({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      order: [["id", "DESC"]],
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
        ],
      },
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const SeachUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.params;

    const regex = search.split(" ").join("|");

    const list = await SearchUser({
      regex,
      order: [["id", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const findAllUsersRecordTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllUsersRecordType({
      where: {
        origin: {
          [Op.and]: {
            [Op.in]: ["google", "facebook", "correo"],
          },
        },
      },

      order: [["origin", "DESC"]],

      attributes: [
        "origin",
        [sequelize.fn("count", sequelize.col("origin")), "quantity"],
      ],
    });
    let copy_list = JSON.parse(JSON.stringify(list));
    let total = 0;
    if (!copy_list.some((item: any) => item.origin == "google"))
      copy_list = [...copy_list, { origin: "google", quantity: 0 }];
    if (!copy_list.some((item: any) => item.origin == "facebook"))
      copy_list = [...copy_list, { origin: "facebook", quantity: 0 }];
    if (!copy_list.some((item: any) => item.origin == "correo"))
      copy_list = [...copy_list, { origin: "correo", quantity: 0 }];

    total = copy_list.reduce(
      (total: any, item: any) => total + item?.quantity,
      0
    );
    res.status(200).json({ total, data: copy_list });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const findAllUsersRangeAgeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let menor_20: any = [];
    let de20_29: any = [];
    let de30_39: any = [];
    let de40_49: any = [];
    let de50_59: any = [];
    let de60_69: any = [];
    let de70_79: any = [];
    let mayor80: any = [];

    const list = await findAllUsersRangeAge();
    const copy_list = JSON.parse(JSON.stringify(list));
    for (const item of copy_list) {
      if (item?.range_age.includes("<20"))
        menor_20.push({ range_age: "<20", cantidad: item?.cantidad });
      if (item?.range_age.includes("20-29"))
        de20_29.push({ range_age: "20-29", cantidad: item?.cantidad });
      if (item?.range_age.includes("30-39"))
        menor_20.push({ range_age: "30-39", cantidad: item?.cantidad });
      if (item?.range_age.includes("40-49"))
        menor_20.push({ range_age: "40-49", cantidad: item?.cantidad });
      if (item?.range_age.includes("50-59"))
        menor_20.push({ range_age: "50-59", cantidad: item?.cantidad });
      if (item?.range_age.includes("60-69"))
        mayor80.push({ range_age: "60-69", cantidad: item?.cantidad });
      if (item?.range_age.includes("70-79"))
        mayor80.push({ range_age: "70-79", cantidad: item?.cantidad });
      if (item?.range_age.includes("80>"))
        mayor80.push({ range_age: "80>", cantidad: item?.cantidad });
    }
    const data = [
      ...menor_20,
      ...de20_29,
      ...de30_39,
      ...de40_49,
      ...de50_59,
      ...de60_69,
      ...de70_79,
      ...mayor80,
    ];
    res.status(200).json(data);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const getPackageUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await findAllPackage();
    res.status(200).json(packages);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const getRouterPackageByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packageId = Number(req.params.id);
    const packageData = await DataBase.instance.routerTracking.findOne({
      where: { id: packageId },
      attributes: {
        exclude: ["id_package", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: DataBase.instance.packages,
          as: "package",
          attributes: ["id", "title", "description", "path_bg", "path_bg_two"],
        },
      ],
    });

    if (!packageData) {
      return res.status(404).json({ message: "Paquete no encontrado para la ruta" });
    }

    res.status(200).json(packageData);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const findProfileUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as IToken;
    const profileUser = await findUserById({
      id: userId,
      attributes: [
        "terms_and_conditions",
        "name",
        "lastname",
        "sexo",
        "dni",
        "email",
        "date_of_birth",
        "nightmode",
        "origin",
        "path",
        "number_of_sessions",
        "cellphone",
      ],
    });

    const isDriver = await findOneDriver({
      email: profileUser.email,
    });

    const isGuide = await findOneGuide({
      email: profileUser.email,
    });

    let role = "user";
    if (isDriver) {
      role = "driver";
    } else if (isGuide) {
      role = "guide";
    }

    const profileWithRole = {
      ...(profileUser && typeof (profileUser as any).toJSON === "function"
        ? (profileUser as any).toJSON()
        : profileUser),
      role: role,
    };
  
    res.status(200).json(profileWithRole);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
export const udpateDaySessionUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as IToken;
    const convertToday = moment().local().format("YYYY-MM-DD");
    const profileUser = await findUserById({
      id: userId,
      attributes: ["user_session_day", "date_user_session_day"],
    });
    if (
      profileUser.user_session_day == null &&
      profileUser.date_user_session_day == null
    ) {
      await updateUser({
        user: {
          user_session_day: 1,
          date_user_session_day: moment(convertToday).toDate(),
        },
        where: {
          id: userId,
        },
      });
      return res.status(200).json("ok");
    }
    if (
      profileUser?.date_user_session_day?.toString() != convertToday &&
      profileUser?.date_user_session_day != null
    ) {
      const diffDaySession = moment()
        .local()
        .diff(profileUser?.date_user_session_day, "days");
      const calculateDaySession =
        diffDaySession + Number(profileUser?.user_session_day);
      await updateUser({
        user: {
          user_session_day: calculateDaySession,
          date_user_session_day: moment(convertToday).toDate(),
        },
        where: {
          id: userId,
        },
      });
      return res.status(200).json("ok");
    }
    res.status(200).json("");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updateIdDeviceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as IToken;

    const obj = await updateIdDevice(req.params.device_id, userId);
    return res.status(200).json(obj);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updatePasswordUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const { new_password } = req.body;

    await updatePasswordUserService(new_password, user.userId);

    res.status(200).json("Se actualizo la contraseña correctamente");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const updateGenderAndDateOfBirthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const { sexo, date_of_birth } = req.body;

    await updateUser({
      where: { id: user.userId },
      user: {
        sexo,
        date_of_birth,
      },
    });

    res.status(200).json("Se actualizo correctamente los datos");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const updateTermsAndConditionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    await updateUser({
      where: { id: user.userId, state: 1 },
      user: {
        terms_and_conditions: true,
      },
    });

    res.status(200).json("Se actualizo correctamente los datos");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const updateImagePerfilServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const results = await updateImagePerfilService({
      image: req.body.image as Buffer,
      userId: user.userId,
    });
    res.status(200).json(results);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

// export const ActiveAccountUserController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body
//     await updateUserStateCodeVerification({state:true,email})
//     res.status(200).json('¡Codigo correcto , ahora puedes iniciar sesión!')
//   } catch (err: any) {
//     if (err instanceof sequelize.ValidationError) next(createError(400, err))
//     next(createError(404, err))
//   }
// }

export const UnsubscribeTheUserAndClean = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const number_random = Math.floor(Math.random() * 500) + 1;
    const email = `usuario_no_disponible${userId}${number_random}@gmail.com`;
    await updateUser({
      user: {
        email,
        // email:'nodisponible@gmail.com',
        state: false,
        password: "UNSUBSCRIBE",
        dni: "9999999",
        salt: "UNSUBSCRIBE",
        filename: "UNSUBSCRIBE",
        cellphone: "0",
        code_verification: "0",
        device_id: "UNSUBSCRIBE",
        lastname: "UNSUBSCRIBE",
        name: "UNSUBSCRIBE",
        updated: moment().toDate(),
      },
      where: {
        id: Number(userId),
      },
    });
    res.status(200).json("Proceso exitoso");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
