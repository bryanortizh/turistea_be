import { findOneColor } from '../services/find/index'

export const existsRoles = async (rolId: number) => {
  const role = await findOneColor({
    where: { id: rolId },
  })
  if (!role) throw new Error('El rolId no existe')
}
