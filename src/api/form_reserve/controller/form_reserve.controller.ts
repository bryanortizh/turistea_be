import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { DataBase } from "../../../database";
import { IToken } from "../../auth/passport/passport";
import { createFormReserve } from "../services/create/form_reserve";
import { findAllFormReserve, findOneFormReserve } from "../services/find/form_reserve";

export const createFormReserveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let processedUsersJson = req.body.users_json;
    if (req.body.users_json && typeof req.body.users_json === 'object') {
      processedUsersJson = JSON.stringify(req.body.users_json);
    }

    const formReserve = await createFormReserve({
      ...req.body,
      id_user: user.userId,
      users_json: processedUsersJson,
      created_by: user.userId,
      updated_by: user.userId,
      created: new Date(),
      updated: new Date(),
      state: true,
    });

    res.status(201).json({
      success: true,
      message: "Formulario de reserva creado exitosamente",
      data: formReserve,
    });
  } catch (err: any) {
    console.error("Error creating form reserve:", err);
    if (err instanceof sequelize.ValidationError) {
      next(createError(400, err.message));
    } else {
      next(createError(500, "Error interno del servidor"));
    }
  }
};

export const findAllFormReserveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const status = req.query.status as string;
    const state = req.query.state;
    const id_package = req.query.id_package;
    const id_user = req.query.id_user;

    // Construir filtros dinámicamente
    const whereConditions: any = {};
    
    if (status !== undefined) {
      whereConditions.status_form = status;
    }
    
    if (state !== undefined) {
      whereConditions.state = Boolean(Number(state));
    }
    
    if (id_package !== undefined) {
      whereConditions.id_package = Number(id_package);
    }
    
    if (id_user !== undefined) {
      whereConditions.id_user = Number(id_user);
    }

    const result = await findAllFormReserve({
      page,
      where: whereConditions,
    });

    res.status(200).json({
      success: true,
      message: "Formularios de reserva obtenidos exitosamente",
      data: {
        ...result,
        // Parsear users_json para cada formulario si existe
        rows: result.rows.map((form: any) => ({
          ...form,
          users_json: form.users_json ? JSON.parse(form.users_json) : null,
        })),
      },
    });
  } catch (err: any) {
    console.error("Error finding form reserves:", err);
    if (err instanceof sequelize.ValidationError) {
      next(createError(400, err.message));
    } else {
      next(createError(500, "Error interno del servidor"));
    }
  }
};

export const findOneFormReserveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formId = Number(req.params.id);

    if (!formId || isNaN(formId)) {
      return next(createError(400, "ID de formulario inválido"));
    }

    const formReserve = await findOneFormReserve({ id: formId });

    if (!formReserve) {
      return next(createError(404, "Formulario de reserva no encontrado"));
    }

    // Parsear users_json si existe
    const formWithParsedJson = {
      ...formReserve,
      users_json: formReserve.users_json ? JSON.parse(formReserve.users_json) : null,
    };

    res.status(200).json({
      success: true,
      message: "Formulario de reserva obtenido exitosamente",
      data: formWithParsedJson,
    });
  } catch (err: any) {
    console.error("Error finding form reserve:", err);
    if (err instanceof sequelize.ValidationError) {
      next(createError(400, err.message));
    } else {
      next(createError(500, "Error interno del servidor"));
    }
  }
};

export const findUserFormReservesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const page = Number(req.query.page) || 1;
    const status = req.query.status as string;
    const state = req.query.state;

    // Obtener el email del usuario actual
    const userRecord = await DataBase.instance.user.findOne({
      where: { id: user.userId },
      attributes: ['email']
    });

    if (!userRecord) {
      return next(createError(404, "Usuario no encontrado"));
    }

    const userEmail = userRecord.email;

    // Verificar si el usuario es un guide, terrace o driver mediante su email
    const [guideRecord, terraceRecord, driverRecord] = await Promise.all([
      DataBase.instance.guide.findOne({ where: { email: userEmail }, attributes: ['id'] }),
      DataBase.instance.terrace.findOne({ where: { email: userEmail }, attributes: ['id'] }),
      DataBase.instance.drivers.findOne({ where: { email: userEmail }, attributes: ['id'] })
    ]);

    let packageIds: number[] = [];

    // Si es guide, terrace o driver, buscar los paquetes vinculados
    if (guideRecord || terraceRecord || driverRecord) {
      const packageWhere: any = { state: true };

      if (guideRecord) {
        packageWhere.id_guide = guideRecord.id;
      } else if (terraceRecord) {
        packageWhere.id_terrace = terraceRecord.id;
      } else if (driverRecord) {
        packageWhere.id_driver = driverRecord.id;
      }

      // Buscar paquetes vinculados
      const packages = await DataBase.instance.packages.findAll({
        where: packageWhere,
        attributes: ['id']
      });

      packageIds = packages.map((pkg: any) => pkg.id);
    }

    // Construir filtros
    const whereConditions: any = {};

    // Si es guide, terrace o driver con paquetes vinculados
    if (packageIds.length > 0) {
      whereConditions.id_package = { [sequelize.Op.in]: packageIds };
    } else {
      // Si es un cliente regular, filtrar por id_user
      whereConditions.id_user = user.userId;
    }
    
    if (status !== undefined) {
      whereConditions.status_form = status;
    }
    
    if (state !== undefined) {
      whereConditions.state = Boolean(Number(state));
    }

    const result = await findAllFormReserve({
      page,
      where: whereConditions,
    });

    res.status(200).json({
      success: true,
      message: "Formularios de reserva del usuario obtenidos exitosamente",
      data: {
        ...result,
      },
    });
  } catch (err: any) {
    console.error("Error finding user form reserves:", err);
    if (err instanceof sequelize.ValidationError) {
      next(createError(400, err.message));
    } else {
      next(createError(500, "Error interno del servidor"));
    }
  }
};