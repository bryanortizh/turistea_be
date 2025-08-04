import { DataBase } from '../../../../database'
import moment from 'moment'
import { AdminRolesAttributes } from '../../models/admin.roles'

export const createAdminRoles = async (rol: string): Promise<AdminRolesAttributes> => {
  try {
    return await DataBase.instance.adminRoles.create({
      rol,
    })
  } catch (err) {
    throw err
  }
}
