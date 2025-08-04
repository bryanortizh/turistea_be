import CryptoJS from 'crypto-js'
import { DataBase } from '../../../../database'
import moment from 'moment'
import { AdminAttributes } from '../../models/admin.model'

export const createAdmin = async ({
  name,
  lastname,
  email,
  cellphone,
  sexo,
  password,
}: {
  name?: string
  lastname?: string
  email?: string
  cellphone?: number
  sexo?: string
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
