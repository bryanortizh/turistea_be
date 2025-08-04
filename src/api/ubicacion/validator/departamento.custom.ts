import { findOneDepartamento } from '../services/find/index'

export const existsDepartamento = async (rolId: number) => {
  const role = await findOneDepartamento({
    where: { id: rolId },
  })
  if (!role) throw new Error('El departamentoId no existe')
}
