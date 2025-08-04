import { findOneDistrito } from '../services/find/distrito'

export const existsDistrito = async (id: number) => {
  const _prov = await findOneDistrito({ where: { id } })
  if (!_prov) throw new Error('¡No existe el Id!')
}
