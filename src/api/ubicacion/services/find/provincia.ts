import { DataBase } from '../../../../database'
import { ProvinciaAttributes } from '../../models/provincia.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, literal } from 'sequelize'

export const findOneProvincia = async ({
  where,
  attributes,
}: {
  where: WhereOptions<ProvinciaAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const _provincia = await DataBase.instance.provincia.findOne({
      where,
      attributes,
    })
    if (_provincia) return _provincia.get({ plain: true })
    return _provincia
  } catch (err) {
    throw err
  }
}

export const CountProvincia = async ({ where }: { where: WhereOptions<ProvinciaAttributes> }) => {
  try {
    const _provincia = await DataBase.instance.provincia.count({
      where,
    })
    return _provincia
  } catch (err) {
    throw err
  }
}

export const findAllProvincia = async ({ region_id }: { region_id: number }) => {
  try {
    const _prov = await DataBase.instance.provincia.findAll({
      attributes: {
        include: ['id', 'name'],
        exclude: ['region_id'],
      },
      include: [
        {
          model: DataBase.instance.departamento,
          as: 'departamento',
          required: true,
          attributes: {
            include: ['id', 'name'],
          },
        },
      ],
      where: {
        $region_id$: region_id,
      },
      order: [['id', 'ASC']],
    })
    return _prov
  } catch (err) {
    throw err
  }
}
export const findProvinciaFilter = async ({
  where,
  attributes,
}: {
  where: WhereOptions<ProvinciaAttributes>
  attributes?: FindAttributeOptions
}): Promise<ProvinciaAttributes[]> => {
  try {
    const data = DataBase.instance.provincia.findAll({
      where,
      attributes,
    })
    return data
  } catch (err) {
    throw err
  }
}
