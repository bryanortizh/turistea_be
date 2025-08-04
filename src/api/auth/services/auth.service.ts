import { TokenPayload } from 'google-auth-library'
import { UserAttributes } from '../../user/models/user.model'
import { findUserByEmail } from '../../user/services/find'
import { googleVerifyToken } from '../helpers/auth.helpers'

export const googleSignInService = async (googleToken: string) => {
  try {
    const payload = (await googleVerifyToken(googleToken)) as TokenPayload
    const user: UserAttributes = await findUserByEmail({ email: payload.email! })

    return payload
  } catch (err) {
    throw err
  }
}
