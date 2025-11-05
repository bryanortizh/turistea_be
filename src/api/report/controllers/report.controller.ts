import { NextFunction, Request, Response } from "express";
import { ExcelExporter } from "../../../utils/exportToExcel";
import createError from "http-errors";
import { findAllUsersReport } from "../../user/services/find/index";
import moment from "moment";
import sequelize, { Op } from "sequelize";
import { DataBase } from "../../../database";

export const report1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start_date, finish_date } = req.params;

    const date_from = start_date; //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, "months").date(0);
    const get_last_day = moment(last_day).format("DD");

    const concat_first_day = moment(`${date_from}-01`).format("YYYY-MM-DD");
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format(
      "YYYY-MM-DD"
    );

    let headerArray = ["#", "DNI", "NOMBRES", "APELLIDOS", "EMAIL", "CELULAR"];

    let result = await findAllUsersReport({
      where: {
        // state: 1,
        [Op.and]: [
          sequelize.literal(
            `DATE_SUB(created , interval 5 hour) between '${concat_first_day}' and '${concat_last_day}' `
          ),
        ],
      },
      attributes: ["id", "dni", "name", "lastname", "email", "cellphone"],
    });
    let title =
      "Usuarios que descargan la aplicación móvil Mi Yunta Financiero";
    let report = new ExcelExporter(headerArray, result, title);
    report.BuildReport1().then(({ statusCode, result }) => {
      res.writeHead(200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      res.end(result, "binary");
    });
  } catch (err: any) {
    next(createError(404, err));
  }
};

export const getNewUsersStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sixMonthsAgo = moment().subtract(6, "months").startOf("month");
    const currentDate = moment().endOf("month");

    const query = `
      SELECT 
        DATE_FORMAT(created, '%Y-%m') as month,
        COUNT(*) as total_users,
        DATE_FORMAT(created, '%M %Y') as month_name
      FROM user
      WHERE created >= :sixMonthsAgo 
        AND created <= :currentDate
        AND state = 1
      GROUP BY DATE_FORMAT(created, '%Y-%m')
      ORDER BY month ASC
    `;

    const results = await DataBase.instance.sequelize.query(query, {
      replacements: {
        sixMonthsAgo: sixMonthsAgo.format("YYYY-MM-DD"),
        currentDate: currentDate.format("YYYY-MM-DD"),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    // Formatear los datos para el frontend
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
      const month = moment().subtract(i, "months");
      const monthKey = month.format("YYYY-MM");
      const monthName = month.format("MMMM YYYY");

      const existingData = Array.isArray(results) 
        ? results.find((item: any) => item.month === monthKey)
        : null;

      monthlyStats.push({
        month: monthKey,
        month_name: monthName,
        total_users: existingData ? parseInt((existingData as any).total_users) : 0,
      });
    }

    const totalNewUsers = monthlyStats.reduce(
      (sum, month) => sum + month.total_users,
      0
    );
    const previousMonth =
      monthlyStats[monthlyStats.length - 2]?.total_users || 0;
    const currentMonth =
      monthlyStats[monthlyStats.length - 1]?.total_users || 0;

    let percentageChange = 0;
    if (previousMonth > 0) {
      percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
    } else if (currentMonth > 0) {
      percentageChange = 100;
    }

    const response = {
      total_users: totalNewUsers,
      percentage_change: Math.round(percentageChange * 100) / 100,
      current_month_users: currentMonth,
      previous_month_users: previousMonth,
      monthly_data: monthlyStats,
    };

    res.status(200).json({
      status: 200,
      message: "Estadísticas de nuevos usuarios obtenidas exitosamente",
      data: response,
    });
  } catch (err: any) {
    next(
      createError(
        404,
        err.message || "Error al obtener estadísticas de usuarios"
      )
    );
  }
};
