import { findOneTip } from '../services/find/index'
export const existsTip = async (tipId: number) => {
  const tip = await findOneTip({ id: tipId })
  if (!tip) throw new Error('¡El tip no existe!')
}
