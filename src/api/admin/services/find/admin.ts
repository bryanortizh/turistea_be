import { DataBase } from '../../../../database/index'
import { AdminAttributes } from '../../models/admin.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findAdminByEmail = async ({
  email,
}: {
  email: string
}): Promise<AdminAttributes | null> => {
  try {
    const admin = await DataBase.instance.admin.findOne({
      where: {
        email,
      },
    })
    if (admin) admin.get({ plain: true })
    return admin
  } catch (err) {
    throw err
  }
}

export const findOneAdmin = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<AdminAttributes>
  attributes?: FindAttributeOptions
}): Promise<AdminAttributes | null> => {
  try {
    const admin = await DataBase.instance.admin.findOne({
      where,
      attributes,
      include: [
        {
          model: DataBase.instance.adminRoles,
          as: 'admin_role',
          required: true,
          attributes: ['id', 'rol'],
        },
      ],
    })
    if (admin) admin.get({ plain: true })
    return admin
  } catch (err) {
    throw err
  }
}
export const findAllAdmin = async ({
  where,
  attributes,
  page,
}: {
  where?: WhereOptions<AdminAttributes>
  attributes?: FindAttributeOptions
  page: number
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.admin.findAndCountAll({
      where,
      attributes,
      include: [
        {
          model: DataBase.instance.adminRoles,
          as: 'admin_role',
          required: true,
          attributes: ['id', 'rol'],
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
