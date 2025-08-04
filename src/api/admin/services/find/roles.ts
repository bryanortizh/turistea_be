import { DataBase } from '../../../../database'
import { AdminRolesAttributes } from '../../models/admin.roles'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findOneRole = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<AdminRolesAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const role = await await DataBase.instance.adminRoles.findOne({
      where,
      attributes,
    })
    if (role) return role.get({ plain: true })
    return role
  } catch (err) {
    throw err
  }
}
export const findAllRoles = async () => {
  try {
    return await DataBase.instance.adminRoles.findAll()
  } catch (err) {
    throw err
  }
}
