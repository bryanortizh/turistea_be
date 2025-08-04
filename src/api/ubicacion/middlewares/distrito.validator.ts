import { body, query, param } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import { findOneDistrito } from '../services/find/distrito'
import { existsDistrito } from '../validator/distrito.custom'

/* export const getProvinciaValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsProvincia),
  allValidator,
] */
export const getDistritoValidator = [
  query('prov_id').isNumeric().withMessage('Se require el prov_id').bail().custom(existsDistrito),
  allValidator,
]
export const existsDistri = async (id: string | number) => {
  const _distrito = await findOneDistrito({
    where: {
      id,
    },
  })
  if (!_distrito) throw new Error(`El distrito no existe`)
}
