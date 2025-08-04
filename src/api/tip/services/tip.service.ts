import { TipAttributes } from '../models/tip.model'
import { createTip } from './create/index'
import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import config from '../../../config/environments'
import { removeFile } from '../../../shared/remove.file'
import { updateTip } from './update/index'
import { findOneTip } from './find/index'
import path from 'path'

export const createTipService = async ({
  tip,
  adminId,
  image,
}: {
  tip: TipAttributes
  adminId: number
  image: Buffer
}) => {
  try {
    let _key: string | undefined = undefined
    let _path: string | undefined = undefined
    let _size: string | undefined = undefined
    if (image) {
      const { key, path, size } = await saveImageInServer({ buffer: image })
      _key = key
      _path = config.PROY_BEURL + '/api/render-image/' + key
      _size = size
    } else {
      _path = (await findOneGlobalVar('tip_image_default'))?.value
    }
    return await createTip({
      adminId,
      motivation: tip.motivation!,
      tip: tip.tip!,
      key: _key!,
      path: _path!,
      size: _size!,
      title: tip.title!,
      tip_category_id: tip.tip_category_id!,
    })
  } catch (err) {
    throw err
  }
}
export const updateImageTipService = async ({
  tipId,
  image,
  adminId,
}: {
  tipId: number
  image: Buffer
  adminId: number
}) => {
  try {
    const _key = (await findOneTip({ id: tipId, state: true }))?.key
    const [result, { key, size }] = await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, _key || '') }),
      saveImageInServer({ buffer: image }),
    ])
    const _path = config.PROY_BEURL + '/api/render-image/' + key
    await updateTip({
      id: tipId,
      key,
      size,
      path: _path,
      adminId,
    })
    return { path: _path, msg: result }
  } catch (err) {
    throw err
  }
}
