import CryptoJS from "crypto-js";
import { DataBase } from "../../../../database/index";
import moment from "moment";
import rn from "random-number";

export const createUser = async ({
  name,
  lastname,
  email,
  cellphone,
  sexo,
  password,
  date_of_birth,
  code_verification,
  state,
  origin,
  key,
  size,
}: {
  name?: string;
  lastname?: string;
  email?: string;
  cellphone?: number;
  sexo?: string;
  password?: string;
  date_of_birth?: string;
  code_verification?: string;
  state?: boolean;
  origin?: string;
  path?: string;
  key?: string;
  size?: string;
}) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(30);
    const hashpwd = CryptoJS.PBKDF2(password!, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    });
    const gen = rn.generator({
      integer: true,
      min: 1,
      max: 100,
    });
    return await DataBase.instance.user.create({
      name,
      lastname,
      email,
      password: hashpwd.toString(),
      salt: salt.toString(),
      cellphone,
      created: moment.utc().toDate(),
      path: `https://robohash.org/${gen()}?set=set2`,
      sexo,
      date_of_birth,
      code_verification,
      state,
      origin,
      size,
      key,
    });
  } catch (err) {
    throw err;
  }
};
