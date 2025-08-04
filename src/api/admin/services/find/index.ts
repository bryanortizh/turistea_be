import { DataBase } from '../../../../database/index'
import { AdminAttributes } from '../../models/admin.model'

export const findAdminByEmail = async ({ email }: { email: string }): Promise<AdminAttributes> => {
  try {
    return (
      await DataBase.instance.admin.findOne({
        where: {
          email,
        },
      })
    )?.get({ plain: true })!
  } catch (err) {
    throw err
  }
}
