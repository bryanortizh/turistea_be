import { DataBase } from '../../../../database'
import { findOneTip } from '../find/index'
import { removeFile } from '../../../../shared/remove.file'
import config from '../../../../config/environments'
import path from 'path'

export const deleteOneTip = async (id: number) => {
  try {
    const key = (await findOneTip({ id: id }))
    return await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!,  '') }),
      DataBase.instance.tip.destroy({
        where: { id },
      }),
    ])
  } catch (err) {
    throw err
  }
}
