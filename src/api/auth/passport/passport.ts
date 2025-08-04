import config from '../../../config/environments/index'
import moment from 'moment'

import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { findTokenByUUID } from '../../token/services/find'
import { TokenAttributes } from '../../token/models/token.model'
import { updateToken } from '../../token/services/update'
import { findUserById } from '../../user/services/find/index'
import { UserAttributes } from '../../user/models/user.model'
import { updateUserById } from '../../user/services/update'

interface JwtPayload {
  _id: string
}
export interface IToken {
  userId: number
}
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_HIDDEN_KEY,
}
export default new Strategy(opts, async (payload: JwtPayload, done) => {
  try {
    const token: TokenAttributes = await findTokenByUUID({ uuid: payload._id })
    if (!token) return done(null, false)
    // const user: UserAttributes = await findUserById({ id: token.userId! })
    // if (!user) return done(null, false)

    if (
      !moment(moment(token.last_petition).utc().add(12, 'hour')).isSameOrAfter(
        moment.utc()
      )
    ) {
      await updateToken({
        uuid: payload._id,
        last_session: moment.utc().toDate(),
        state: false,
      })
      return done(null, false)
    }
    await updateToken({
      uuid: payload._id,
      last_petition: moment.utc().add(12, 'hour').toDate(),
    })
    // await Promise.all([
    //   updateUserById({
    //     id: user.id,
    //     number_of_sessions: user.number_of_sessions! + 1,
    //   }),
    // ])
    return done(null, {
      userId: token.userId,
      rol: token.rol,
      // avatar: user.path,
    })
  } catch (err) {
    return done(null, false)
  }
})
