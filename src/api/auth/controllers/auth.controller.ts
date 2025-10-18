import sequelize from "sequelize";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import {
  createUserAndSendCodeVerificationToMail,
  createNewUser,
} from "../../user/services/user.service";
import {
  signInAdminService,
  signInService,
  signInSocialNetworkService,
} from "../../token/services/token.service";
import { googleSignInService } from "../services/auth.service";
import { createAdminAndSendMail } from "../../admin/services/admin.service";
import rn from "random-number";
import { TokenAttributes } from "../../token/models/token.model";
import { findTokenByUUID } from "../../token/services/find";
import { closeAllSession } from "../../token/services/update";
import config from "../../../config/environments/index";
import jwt from "jsonwebtoken";
import { findUserByEmailWithoutState } from "../../user/services/find/index";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      lastname,
      email,
      cellphone,
      dni,
      sexo,
      password,
      date_of_birth,
    } = req.body;

    enum opt {
      max = 9998,
      min = 1001,
    }

    const gen = rn.generator({
      min: opt.min,
      max: opt.max,
      integer: true,
    });
    const code = gen().toString();

    await createUserAndSendCodeVerificationToMail({
      name,
      lastname,
      email,
      cellphone,
      sexo,
      dni,
      password,
      code_verification: code,
      date_of_birth,
      state: false,
    });

    res
      .status(200)
      .json(
        "¡El usuario fue creado con exito, se te envio un código verifica tu correo !"
      );
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

interface ISignIn {
  email: string;
  password: string;
}
//*@DESC Signin of users with local strategy
export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as ISignIn;
    const jwt = await signInService({ email, password });
    res.status(200).json(jwt);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
  next(createError(404, err));
  }
};

export const signOutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const parametros:any = req
    const opts = {
      // token: req.headers.authorization?.split(' ')[1],
      secretOrKey: config.SECRET_HIDDEN_KEY,
    };

    const extractToken = req.headers.authorization?.split(" ")[1];

    const data_values: any = await new Promise((resolve, reject) => {
      jwt.verify(
        extractToken as string,
        opts.secretOrKey as string,
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
    const token: TokenAttributes = await findTokenByUUID({
      uuid: data_values?._id,
    });
    await closeAllSession({
      userId: token.userId as number,
      rol: token.rol as string,
    });

    res.status(200).json({ signout: true });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const googleSignInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restuls = await googleSignInService(req.body.token);
    res.status(200).json(restuls);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
export const signUpAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createAdminAndSendMail(req.body);
    res.status(200).json("administrador creado!");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
//*@DESC Signin of admin with local strategy
export const signInAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as ISignIn;
    const jwt = await signInAdminService({ email, password });
    res.status(200).json(jwt);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const signInSocialNetworkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      lastname,
      email,
      cellphone,
      sexo,
      password,
      dni,
      key,
      date_of_birth,
      origin,
    } = req.body;
    // res.status(200).json({
    //   name,
    //   lastname,
    //   email,
    //   cellphone,
    //   sexo,
    //   password,
    //   dni,
    //   date_of_birth
    // })
    enum opt {
      max = 9998,
      min = 1001,
    }

    const gen = rn.generator({
      min: opt.min,
      max: opt.max,
      integer: true,
    });
    // Validar si el correo ya tiene una cuenta ?
    const userExisted = await findUserByEmailWithoutState({ email });
    if (userExisted) {
      let userId = userExisted.id as number;
      let number_of_sessions = userExisted.number_of_sessions as number;

      const jwt = await signInSocialNetworkService({
        userId,
        email,
        password,
        number_of_sessions,
      });
      res.status(200).json(jwt);
    } else {
      var user = await createNewUser({
        name,
        lastname,
        email,
        cellphone,
        sexo,
        password,
        dni,
        date_of_birth,
        state: true,
        origin,
      });

      let userId = user.id as number;
      let number_of_sessions = user.number_of_sessions as number;
      const jwt = await signInSocialNetworkService({
        userId,
        email,
        password,
        number_of_sessions,
      });
      res.status(200).json(jwt);
    }
  } catch (err: any) {
    next(createError(404, err));
  }
};

export const validarEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userExisted = await findUserByEmailWithoutState({ email });
    if (userExisted) {
      let userId = userExisted.id as number;
      let number_of_sessions = userExisted.number_of_sessions as number;

      const jwt = await signInSocialNetworkService({
        userId,
        email,
        password,
        number_of_sessions,
      });
      res.status(200).json(jwt);
    } else {
      res.status(200).json(null);
    }
  } catch (err: any) {
    next(createError(404, err));
  }
};

export const signInSocialNetworkControllerWithoutValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      lastname,
      email,
      path,
      cellphone,
      sexo,
      password,
      dni,
      date_of_birth,
      origin,
      code_departamento,
      code_provincia,
      ubigeo,
      name_departamento,
      name_provincia,
      name_distrito,
      key,
    } = req.body;
    enum opt {
      max = 9998,
      min = 1001,
    }

    const gen = rn.generator({
      min: opt.min,
      max: opt.max,
      integer: true,
    });
    // Validar si el correo ya tiene una cuenta ?
    var user = await createNewUser({
      name,
      lastname,
      email,
      cellphone,
      sexo,
      path,
      password,
      dni,
      date_of_birth,
      state: true,
      origin,
      key,
    });
    let userId = user.id as number;
    let number_of_sessions = user.number_of_sessions as number;
    const jwt = await signInSocialNetworkService({
      userId,
      email,
      password,
      number_of_sessions,
    });
    res.status(200).json(jwt);
  } catch (err: any) {
    next(createError(404, err));
  }
};
