import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library'
import config from '../../../config/environments/index'
const client = new OAuth2Client(config.CLIENT_ID)

export const googleVerifyToken = async (
  idToken: string
): Promise<TokenPayload | undefined> => {
  try {
    const loginTicket: LoginTicket = await client.verifyIdToken({
      idToken,
      audience: config.CLIENT_ID,
    })
    return loginTicket.getPayload()
  } catch (err) {
    throw err
  }
}
