import { DataBase } from '../../../../database'
import { DistritoAttributes } from '../../models/distrito.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, literal } from 'sequelize'

export const findOneDistrito = async ({
  where,
  attributes,
}: {
  where: WhereOptions<DistritoAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const _distrito = await DataBase.instance.distrito.findOne({
      where,
      attributes,
    })
    if (_distrito) return _distrito.get({ plain: true })
    return _distrito
  } catch (err) {
    throw err
  }
}

export const CountDistrito = async ({ where }: { where: WhereOptions<DistritoAttributes> }) => {
  try {
    const _distrito = await DataBase.instance.distrito.count({
      where,
    })
    return _distrito
  } catch (err) {
    throw err
  }
}

export const findAllDistrito = async ({ prov_id }: { prov_id: number }) => {
  try {
    const _distrito = await DataBase.instance.distrito.findAll({
      attributes: {
        include: ['id', 'name'],
        exclude: ['prov_id'],
      },
      include: [
        {
          model: DataBase.instance.provincia,
          as: 'provincium',
          required: true,
          attributes: {
            include: ['id', 'name'],
          },
        },
      ],
      where: {
        $prov_id$: prov_id,
      },
      order: [['id', 'ASC']],
    })
    return _distrito
  } catch (err) {
    throw err
  }
}
export const findDistritoFilter = async ({
  where,
  attributes,
}: {
  where: WhereOptions<DistritoAttributes>
  attributes?: FindAttributeOptions
}): Promise<DistritoAttributes[]> => {
  try {
    const data = DataBase.instance.distrito.findAll({
      where,
      attributes,
    })
    return data
  } catch (err) {
    throw err
  }
}
