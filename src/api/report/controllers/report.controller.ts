import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import moment from "moment";
import sequelize, { Op } from "sequelize";
import { DataBase } from "../../../database";

const executeStatsQueries = async (
  sixMonthsAgo: string,
  currentDate: string
) => {
  const adminQuery = `
    SELECT 
      DATE_FORMAT(created, '%Y-%m') as month,
      COUNT(*) as total_users,
      DATE_FORMAT(created, '%M %Y') as month_name
    FROM admin
    WHERE created >= :sixMonthsAgo 
      AND created <= :currentDate
      AND state = 1
    GROUP BY DATE_FORMAT(created, '%Y-%m')
    ORDER BY month ASC
  `;

  const userQuery = `
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

  const totalUsersQuery = `
    SELECT COUNT(*) as total_users
    FROM user
    WHERE state = 1
  `;

  const [adminResults, userResults, totalUserResult] = await Promise.all([
    DataBase.instance.sequelize.query(adminQuery, {
      replacements: { sixMonthsAgo, currentDate },
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(userQuery, {
      replacements: { sixMonthsAgo, currentDate },
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(totalUsersQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
  ]);

  return { adminResults, userResults, totalUserResult };
};

const formatMonthlyStats = (results: any[]) => {
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
      total_users: existingData
        ? parseInt((existingData as any).total_users)
        : 0,
    });
  }
  return monthlyStats;
};

const calculatePercentageChange = (
  currentMonth: number,
  previousMonth: number
) => {
  let percentageChange = 0;
  if (previousMonth > 0) {
    percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
  } else if (currentMonth > 0) {
    percentageChange = 100;
  }
  return Math.round(percentageChange * 100) / 100;
};

const generateAdminResponse = (monthlyStats: any[]) => {
  const totalNewAdmins = monthlyStats.reduce(
    (sum, month) => sum + month.total_users,
    0
  );
  const previousMonth = monthlyStats[monthlyStats.length - 2]?.total_users || 0;
  const currentMonth = monthlyStats[monthlyStats.length - 1]?.total_users || 0;
  const percentageChange = calculatePercentageChange(
    currentMonth,
    previousMonth
  );

  return {
    total_users: totalNewAdmins,
    percentage_change: percentageChange,
    current_month_users: currentMonth,
    previous_month_users: previousMonth,
    monthly_data: monthlyStats,
  };
};

const generateUserResponse = (monthlyStats: any[], totalUserResult: any[]) => {
  const totalUsersInSystem =
    Array.isArray(totalUserResult) && totalUserResult.length > 0
      ? parseInt((totalUserResult[0] as any).total_users)
      : 0;

  const totalNewUsers = monthlyStats.reduce(
    (sum, month) => sum + month.total_users,
    0
  );
  const previousMonth = monthlyStats[monthlyStats.length - 2]?.total_users || 0;
  const currentMonth = monthlyStats[monthlyStats.length - 1]?.total_users || 0;
  const percentageChange = calculatePercentageChange(
    currentMonth,
    previousMonth
  );

  return {
    total_users_system: totalUsersInSystem,
    new_users_last_6_months: totalNewUsers,
    percentage_change: percentageChange,
    current_month_users: currentMonth,
    previous_month_users: previousMonth,
    monthly_data: monthlyStats,
  };
};

const executeDriversStatsQueries = async (
  sixMonthsAgo: string,
  currentDate: string
) => {
  const driversQuery = `
    SELECT 
      DATE_FORMAT(created, '%Y-%m') as month,
      COUNT(*) as total_drivers,
      DATE_FORMAT(created, '%M %Y') as month_name
    FROM drivers
    WHERE created >= :sixMonthsAgo 
      AND created <= :currentDate
      AND state = 1
    GROUP BY DATE_FORMAT(created, '%Y-%m')
    ORDER BY month ASC
  `;

  const totalDriversQuery = `
    SELECT COUNT(*) as total_drivers
    FROM drivers
    WHERE state = 1
  `;

  const [driversResults, totalDriversResult] = await Promise.all([
    DataBase.instance.sequelize.query(driversQuery, {
      replacements: { sixMonthsAgo, currentDate },
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(totalDriversQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
  ]);

  return { driversResults, totalDriversResult };
};

const executeTerraceStatsQueries = async (
  sixMonthsAgo: string,
  currentDate: string
) => {
  const terraceQuery = `
    SELECT 
      DATE_FORMAT(created, '%Y-%m') as month,
      COUNT(*) as total_terrace,
      DATE_FORMAT(created, '%M %Y') as month_name
    FROM terrace
    WHERE created >= :sixMonthsAgo 
      AND created <= :currentDate
      AND state = 1
    GROUP BY DATE_FORMAT(created, '%Y-%m')
    ORDER BY month ASC
  `;

  const totalTerraceQuery = `
    SELECT COUNT(*) as total_terrace
    FROM terrace
    WHERE state = 1
  `;

  const [terraceResults, totalTerraceResult] = await Promise.all([
    DataBase.instance.sequelize.query(terraceQuery, {
      replacements: { sixMonthsAgo, currentDate },
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(totalTerraceQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
  ]);

  return { terraceResults, totalTerraceResult };
};

const executeGuidesStatsQueries = async (
  sixMonthsAgo: string,
  currentDate: string
) => {
  const guidesQuery = `
    SELECT 
      DATE_FORMAT(created, '%Y-%m') as month,
      COUNT(*) as total_guides,
      DATE_FORMAT(created, '%M %Y') as month_name
    FROM guide
    WHERE created >= :sixMonthsAgo 
      AND created <= :currentDate
      AND state = 1
    GROUP BY DATE_FORMAT(created, '%Y-%m')
    ORDER BY month ASC
  `;

  const totalGuidesQuery = `
    SELECT COUNT(*) as total_guides
    FROM guide
    WHERE state = 1
  `;

  const [guidesResults, totalGuidesResult] = await Promise.all([
    DataBase.instance.sequelize.query(guidesQuery, {
      replacements: { sixMonthsAgo, currentDate },
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(totalGuidesQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
  ]);

  return { guidesResults, totalGuidesResult };
};

const generateGenericResponse = (
  monthlyStats: any[],
  totalResult: any[],
  entityName: string
) => {
  const totalInSystem =
    Array.isArray(totalResult) && totalResult.length > 0
      ? parseInt((totalResult[0] as any)[`total_${entityName}`])
      : 0;

  const totalNew = monthlyStats.reduce(
    (sum, month) => sum + month[`total_${entityName}`],
    0
  );
  const previousMonth =
    monthlyStats[monthlyStats.length - 2]?.[`total_${entityName}`] || 0;
  const currentMonth =
    monthlyStats[monthlyStats.length - 1]?.[`total_${entityName}`] || 0;
  const percentageChange = calculatePercentageChange(
    currentMonth,
    previousMonth
  );

  return {
    [`total_${entityName}_system`]: totalInSystem,
    [`new_${entityName}_last_6_months`]: totalNew,
    percentage_change: percentageChange,
    current_month: currentMonth,
    previous_month: previousMonth,
    monthly_data: monthlyStats,
  };
};

const formatGenericMonthlyStats = (results: any[], entityName: string) => {
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
      [`total_${entityName}`]: existingData
        ? parseInt((existingData as any)[`total_${entityName}`])
        : 0,
    });
  }
  return monthlyStats;
};

const formatDailyStats = (results: any[], limit: number) => {
  const dailyStats = [];
  for (let i = limit - 1; i >= 0; i--) {
    const day = moment().subtract(i, "days");
    const dayKey = day.format("YYYY-MM-DD");

    const existingData = Array.isArray(results)
      ? results.find((item: any) => item.reservation_period === dayKey)
      : null;

    dailyStats.push({
      reservation_period: dayKey,
      total_reserves: existingData ? parseInt(existingData.total_reserves) : 0,
      pending_reserves: existingData ? existingData.pending_reserves : "0",
      rejected_reserves: existingData ? existingData.rejected_reserves : "0",
      pendingpay_reserves: existingData ? existingData.pendingpay_reserves : "0",
      reserve_reserves: existingData ? existingData.reserve_reserves : "0",
      inprocesstravel_reserves: existingData ? existingData.inprocesstravel_reserves : "0",
      done_reserves: existingData ? existingData.done_reserves : "0",
      approved_reserves: existingData ? existingData.approved_reserves : "0",
      total_revenue: existingData ? existingData.total_revenue : "0.00",
      avg_price: existingData ? existingData.avg_price : "0.000000",
      total_people: existingData ? existingData.total_people : "0",
      reservation_date: dayKey
    });
  }
  return dailyStats;
};

export const getNewUsersStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sixMonthsAgo = moment().subtract(6, "months").startOf("month");
    const currentDate = moment().endOf("month");
    const sixMonthsAgoStr = sixMonthsAgo.format("YYYY-MM-DD");
    const currentDateStr = currentDate.format("YYYY-MM-DD");

    const [
      { adminResults, userResults, totalUserResult },
      { driversResults, totalDriversResult },
      { terraceResults, totalTerraceResult },
      { guidesResults, totalGuidesResult },
    ] = await Promise.all([
      executeStatsQueries(sixMonthsAgoStr, currentDateStr),
      executeDriversStatsQueries(sixMonthsAgoStr, currentDateStr),
      executeTerraceStatsQueries(sixMonthsAgoStr, currentDateStr),
      executeGuidesStatsQueries(sixMonthsAgoStr, currentDateStr),
    ]);

    const adminMonthlyStats = formatMonthlyStats(adminResults);
    const userMonthlyStats = formatMonthlyStats(userResults);
    const driversMonthlyStats = formatGenericMonthlyStats(
      driversResults,
      "drivers"
    );
    const terraceMonthlyStats = formatGenericMonthlyStats(
      terraceResults,
      "terrace"
    );
    const guidesMonthlyStats = formatGenericMonthlyStats(
      guidesResults,
      "guides"
    );

    const adminResponse = generateAdminResponse(adminMonthlyStats);
    const userResponse = generateUserResponse(
      userMonthlyStats,
      totalUserResult
    );
    const driversResponse = generateGenericResponse(
      driversMonthlyStats,
      totalDriversResult,
      "drivers"
    );
    const terraceResponse = generateGenericResponse(
      terraceMonthlyStats,
      totalTerraceResult,
      "terrace"
    );
    const guidesResponse = generateGenericResponse(
      guidesMonthlyStats,
      totalGuidesResult,
      "guides"
    );

    res.status(200).json({
      status: 200,
      message: "Estadísticas completas obtenidas exitosamente",
      data: adminResponse,
      data_user: userResponse,
      data_drivers: driversResponse,
      data_terrace: terraceResponse,
      data_guides: guidesResponse,
    });
  } catch (err: any) {
    next(createError(404, err.message || "Error al obtener estadísticas"));
  }
};

const executeReservesQueries = async (filterType: string, limit: number) => {
  let dateFilter = '';
  let groupBy = '';
  let orderBy = '';
  let selectPeriod = '';
  let selectDate = '';
  
  switch (filterType) {
    case 'days':
      dateFilter = `DATE(created) >= DATE_SUB(CURDATE(), INTERVAL ${limit - 1} DAY)`;
      groupBy = 'DATE(created)';
      selectPeriod = 'DATE(created)';
      selectDate = 'DATE(created)';
      orderBy = 'DATE(created) ASC';
      break;
    case 'months':
      dateFilter = `DATE(created) >= DATE_SUB(CURDATE(), INTERVAL ${limit} MONTH)`;
      groupBy = 'DATE_FORMAT(created, \'%Y-%m\')';
      selectPeriod = 'DATE_FORMAT(created, \'%Y-%m\')';
      selectDate = 'DATE_FORMAT(created, \'%Y-%m\')';
      orderBy = 'DATE_FORMAT(created, \'%Y-%m\') ASC';
      break;
    case 'years':
      dateFilter = `DATE(created) >= DATE_SUB(CURDATE(), INTERVAL ${limit} MONTH)`;
      groupBy = 'DATE_FORMAT(created, \'%Y-%m\')';
      selectPeriod = 'DATE_FORMAT(created, \'%Y-%m\')';
      selectDate = 'DATE_FORMAT(created, \'%Y-%m\')';
      orderBy = 'DATE_FORMAT(created, \'%Y-%m\') ASC';
      break;
    default:
      throw new Error('Tipo de filtro no válido');
  }

  const reservesQuery = `
    SELECT 
      status_form,
      price_total,
      cant_people
    FROM form_reserve
    WHERE ${dateFilter} AND state = 1
  `;

  const statsQuery = `
    SELECT 
      ${selectPeriod} as reservation_period,
      COUNT(*) as total_reserves,
      SUM(CASE WHEN status_form = 'pending' THEN 1 ELSE 0 END) as pending_reserves,
      SUM(CASE WHEN status_form = 'rejected' THEN 1 ELSE 0 END) as rejected_reserves,
      SUM(CASE WHEN status_form = 'pendingpay' THEN 1 ELSE 0 END) as pendingpay_reserves,
      SUM(CASE WHEN status_form = 'reserve' THEN 1 ELSE 0 END) as reserve_reserves,
      SUM(CASE WHEN status_form = 'inprocesstravel' THEN 1 ELSE 0 END) as inprocesstravel_reserves,
      SUM(CASE WHEN status_form = 'done' THEN 1 ELSE 0 END) as done_reserves,
      SUM(CASE WHEN status_form = 'approved' THEN 1 ELSE 0 END) as approved_reserves,
      SUM(price_total) as total_revenue,
      AVG(price_total) as avg_price,
      SUM(cant_people) as total_people,
      ${selectDate} as reservation_date
    FROM form_reserve
    WHERE ${dateFilter} AND state = 1
    GROUP BY ${groupBy}
    ORDER BY ${orderBy}
  `;

  const [reservesResults, statsResults] = await Promise.all([
    DataBase.instance.sequelize.query(reservesQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
    DataBase.instance.sequelize.query(statsQuery, {
      type: sequelize.QueryTypes.SELECT,
    }),
  ]);

  return { reservesResults, statsResults };
};



export const getReservesReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter = 'days' } = req.query;
    
    const validFilters = ['days', 'months', 'years'];
    if (!validFilters.includes(filter as string)) {
      return res.status(400).json({
        status: 400,
        message: "Filtro no válido. Use: days, months, o years"
      });
    }

    let limit = 25; 
    if (filter === 'months') {
      limit = 6;
    } else if (filter === 'years') {
      limit = 12;
    }

    const { reservesResults, statsResults } = await executeReservesQueries(
      filter as string,
      limit
    );
    
    const totalReserves = reservesResults.length;
    const totalRevenue = reservesResults.reduce((sum: number, reserve: any) => 
      sum + parseFloat(reserve.price_total || 0), 0
    );
    const totalPeople = reservesResults.reduce((sum: number, reserve: any) => 
      sum + parseInt(reserve.cant_people || 0), 0
    );
    
    const statusCounts = reservesResults.reduce((acc: any, reserve: any) => {
      acc[reserve.status_form] = (acc[reserve.status_form] || 0) + 1;
      return acc;
    }, {});

    let formattedPeriodStats = statsResults;
    if (filter === 'days') {
      formattedPeriodStats = formatDailyStats(statsResults, limit);
    }

    res.status(200).json({
      status: 200,
      message: "Reporte de reservas obtenido exitosamente",
      filter_applied: filter,
      period_limit: limit,
      summary: {
        total_reserves: totalReserves,
        total_revenue: totalRevenue,
        average_price: totalReserves > 0 ? (totalRevenue / totalReserves).toFixed(2) : 0,
        total_people: totalPeople,
        status_breakdown: {
          pending: statusCounts.pending || 0,
          rejected: statusCounts.rejected || 0,
          pendingpay: statusCounts.pendingpay || 0,
          reserve: statusCounts.reserve || 0,
          inprocesstravel: statusCounts.inprocesstravel || 0,
          done: statusCounts.done || 0,
          approved: statusCounts.approved || 0
        }
      },
      period_stats: formattedPeriodStats
    });
  } catch (err: any) {
    next(createError(404, err.message || "Error al obtener reporte de reservas"));
  }
};
