import { DataBase } from '../../../../database'
import moment from 'moment'
import { CommentsAttributes } from '../../models/comments_map.model'

export const createComments = async ({
  userId,
  coment_text,
  direct_map,
  lat_direccion,
  long_direccion,
  coment_calificacion,
  coment_motivo,
}: {
  userId: number
  coment_text: string
  direct_map: string
  lat_direccion: number
  long_direccion: number
  coment_calificacion: string
  coment_motivo: string
}): Promise<CommentsAttributes> => {
  try {
    return await DataBase.instance.commentsMap.create({
      created_by: userId,
      id_user: userId,
      created: moment.utc().toDate(),
      coment_text,
      direct_map,
      lat_direccion,
      long_direccion,
      coment_calificacion,
      coment_motivo,
    })
  } catch (err) {
    throw err
  }
}
