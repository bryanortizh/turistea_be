import { findOneDepartamento } from '../services/find'

export const existsDepar = async (id: string | number) => {
  const _departamento = await findOneDepartamento({
    where: {
      id,
    },
  })
  if (!_departamento) throw new Error(`El departmento no existe`)
}
