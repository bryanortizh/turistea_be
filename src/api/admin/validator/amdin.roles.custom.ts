import { findOneRole } from '../services/find/roles'

export const existsRoles = async (rolId: number) => {
  const role = await findOneRole({
    where: { id: rolId },
  })
  if (!role) throw new Error('El rolId no existe')
}
