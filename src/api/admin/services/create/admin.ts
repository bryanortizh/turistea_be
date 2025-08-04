import CryptoJS from 'crypto-js'
import { DataBase } from '../../../../database'
import moment from 'moment'
import { AdminAttributes } from '../../models/admin.model'
import { generate } from 'generate-password'
import rn from 'random-number'
export const createAdmin = async ({
  name,
  lastname,
  email,
  cellphone,
  password,
}: {
  name?: string
  lastname?: string
  email?: string
  cellphone?: number
  password?: string
}): Promise<AdminAttributes> => {
  try {
    const salt = CryptoJS.lib.WordArray.random(30)
    const hashpwd = CryptoJS.PBKDF2(password!, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    })
    return await DataBase.instance.admin.create({
      name,
      lastname,
      email,
      password: hashpwd.toString(),
      salt: salt.toString(),
      cellphone,
      created: moment.utc().toDate(),
    })
  } catch (err) {
    throw err
  }
}
export const createAdminIntranet = async ({
  admin,
  adminId,
}: {
  admin: AdminAttributes
  adminId: number
}): Promise<AdminAttributes> => {
  try {
    const password = generate({
      length: 10,
      symbols: false,
      numbers: true,
      lowercase: true,
      uppercase: false,
    })
    const salt = CryptoJS.lib.WordArray.random(30)
    const hashpwd = CryptoJS.PBKDF2(password, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    })
    const gen = rn.generator({
      integer: true,
      min: 1,
      max: 100,
    })
    const { id, name, lastname, email, cellphone, path } =
      await DataBase.instance.admin.create({
        name: admin.name,
        lastname: admin.lastname,
        email: admin.email,
        password: hashpwd.toString(),
        salt: salt.toString(),
        cellphone: admin.cellphone,
        created: moment.utc().toDate(),
        created_by: adminId,
        admin_rol_id: admin.admin_rol_id,
        path: `https://robohash.org/${gen()}?set=set2`,
      })
    return { id, name, lastname, email, cellphone, password, path }
  } catch (err) {
    throw err
  }
}
