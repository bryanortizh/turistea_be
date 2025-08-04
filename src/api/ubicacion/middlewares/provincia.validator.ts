import { body, query, param } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import { findOneProvincia } from '../services/find/provincia'
import { existsProvincia } from '../validator/provincia.custom'

/* export const getProvinciaValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsProvincia),
  allValidator,
] */
export const getProvinciaValidator = [
  query('region_id').isNumeric().withMessage('Se requiere el region_id').bail().custom(existsProvincia),
  allValidator,
]
export const existsProv = async (id: string | number) => {
  const _provincia = await findOneProvincia({
    where: {
      id,
    },
  })
  if (!_provincia) throw new Error(`La provincia no existe`)
}
