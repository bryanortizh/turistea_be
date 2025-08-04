import { CommentsAttributes } from '../models/comments_map.model'
import { createComments } from './create/index'
import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import config from '../../../config/environments'
import { removeFile } from '../../../shared/remove.file'
import { updateTip } from './update/index'
import { findOneTip } from './find/index'
import path from 'path'

export const createCommentsService = async ({
  comment,
  userId,
}: {
  comment: CommentsAttributes
  userId: number
}) => {
  try {
    return await createComments({
      userId,
      coment_text: comment.coment_text!,
      direct_map: comment.direct_map!,
      lat_direccion: comment.lat_direccion!,
      long_direccion: comment.long_direccion!,
      coment_calificacion: comment.coment_calificacion!,
      coment_motivo: comment.coment_motivo!,
    })
  } catch (err) {
    throw err
  }
}
