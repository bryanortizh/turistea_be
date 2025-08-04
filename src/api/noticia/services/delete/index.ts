import { DataBase } from '../../../../database'
import { findOneNoticia } from '../find/index'
import { removeFile } from '../../../../shared/remove.file'
import config from '../../../../config/environments'
import path from 'path'

export const deleteOneNoticia = async (id: number) => {
  try {
    const key = (await findOneNoticia({ id: id }))?.key
    return await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, key || '') }),
      DataBase.instance.noticia.destroy({
        where: { id },
      }),
    ])
  } catch (err) {
    throw err
  }
}
