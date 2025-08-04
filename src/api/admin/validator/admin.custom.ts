// import { Request } from 'express'
import { DataBase } from '../../../database'
import { findAdminByEmail, findOneAdmin } from '../services/find/admin'
import CryptoJS from 'crypto-js'
// import { IToken } from '../../auth/passport/passport'
// import { UserAttributes } from '../../user/models/user.model'

export const existsEmailOfAdmin = async (email: string): Promise<void> => {
  const _email = await findAdminByEmail({ email })
  if (_email) throw new Error('Ya existe el email')
}
export const existsAdmin = async (id: number) => {
  const admin = await findOneAdmin({
    where: {
      id,
      state: true,
    },
  })
  if (!admin) throw new Error('No existe el administrador')
}
export const accessOnlyAdminPrimary = async (
  id: number,
  { req }: { req: any }
): Promise<void> => {
  const admin = await findOneAdmin({
    where: {
      id: req.user.userId,
      admin_rol_id: 1,
      state: 1,
    },
  })
  if (!admin) throw new Error('No tiene los privilegios a esta accion')
}


export const  validatePasswordAdmin = async (current_password:string,
  { req }: { req: any }) =>{
  
    const admin = await DataBase.instance.admin.findOne({
      where:{
      id: req.user.userId,
      admin_rol_id: 1,
      state: 1,
      }
    })

    if(!validatePassPriv({
      hashedPass:admin?.password,
      salt:admin?.salt,
      password:current_password
    })) throw new Error('La contraseña actual que haz enviado es errónea')
  
}


export const validatePassPriv = ({
  password,
  salt,
  hashedPass,
}: {
  password?: string
  salt?: string
  hashedPass?: string
}): boolean => {
  const testHash = CryptoJS.PBKDF2(password!, salt!, {
    iterations: 10000,
    keySize: 10,
  })
  return testHash.toString() == hashedPass ? true : false
}

export const RegexValidNewPassword = (new_password:string) => {
  // const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
  const regex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  
  if(regex.test(new_password) == false) {
    throw new Error('Se requiere al menos un numero y un caracter especial')
    // throw new Error('Mínimo 8 caracteres al menos 1 alfabeto en mayúscula, 1 alfabeto en minúscula, 1 número y 1 carácter especial')
  }else{
    return true
  }
}


