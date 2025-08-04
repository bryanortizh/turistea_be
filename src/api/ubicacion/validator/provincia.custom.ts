import { findOneProvincia } from '../services/find/provincia'

export const existsProvincia = async (id: number) => {
  const _package = await findOneProvincia({ where: { id } })
  if (!_package) throw new Error('¡No existe el Id!')
}
