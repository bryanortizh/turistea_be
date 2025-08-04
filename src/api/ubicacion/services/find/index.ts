import { FindAttributeOptions, WhereOptions } from 'sequelize/types'
import { DataBase } from '../../../../database'
import { DepartamentoTypeAttributes } from '../../models/departamento.model'
export const findOneDepartamento = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<DepartamentoTypeAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const role = await await DataBase.instance.departamento.findOne({
      where,
      attributes,
    })
    if (role) return role.get({ plain: true })
    return role
  } catch (err) {
    throw err
  }
}
export const findAllDepartamento = async () => {
  try {
    return await DataBase.instance.departamento.findAll()
  } catch (err) {
    throw err
  }
}
