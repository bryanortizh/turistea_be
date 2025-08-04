import { findOneNoticia } from '../services/find/index'
export const existsNoticia = async (tipId: number) => {
  const tip = await findOneNoticia({ id: tipId })
  if (!tip) throw new Error('¡La Noticia no existe!')
}
