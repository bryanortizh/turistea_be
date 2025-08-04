import { NextFunction, Request, Response } from 'express'
import { ExcelExporter } from '../../../utils/exportToExcel';
import createError from 'http-errors'
import { findAllUsersReport } from '../../user/services/find/index'
import moment from 'moment';
import sequelize, { Op } from 'sequelize';
// export const report1 = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let headerArray = [
//             { dataBound: "nro_documento", name: "Nro factura", width: 20 },
//         ];
//         let result = {};

//         let report = new ExcelExporter(headerArray, result);
//         var f = await report.BuildTest();
//         console.log('efe ', f)
//         report.BuildTest().then( ({ statusCode , result}) => {
//             res.writeHead(200, {
//                 "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             })
//             res.end(result, "binary")
//         });

        

//     }catch(err: any){
//         next(createError(404, err))
//     }
// }

export const report1 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { start_date, finish_date } = req.params
    
    const date_from = start_date //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, 'months').date(0)
    const get_last_day = moment(last_day).format('DD')

    const concat_first_day = moment(`${date_from}-01`).format('YYYY-MM-DD')
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format('YYYY-MM-DD')
      
      
      let headerArray = ['#', 'DNI', 'NOMBRES', 'APELLIDOS', 'EMAIL', 'CELULAR']
  
      let result = await findAllUsersReport({
        where: {
          // state: 1,
          [Op.and]:[
          sequelize.literal(`DATE_SUB(created , interval 5 hour) between '${concat_first_day}' and '${concat_last_day}' `)
          ]
        },
        attributes: ['id', 'dni', 'name', 'lastname', 'email', 'cellphone'],
      })
      let title = 'Usuarios que descargan la aplicación móvil Mi Yunta Financiero'
      let report = new ExcelExporter(headerArray, result, title)
      report.BuildReport1().then(({ statusCode, result }) => {
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        res.end(result, 'binary')
      })
    } catch (err: any) {
      next(createError(404, err))
    }
  }