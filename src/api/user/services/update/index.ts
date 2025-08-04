import { DataBase } from "../../../../database";
import moment from "moment";
import { WhereOptions } from "sequelize/types";
import { UserAttributes } from "../../models/user.model";
// import { UserAttributes } from '../../models/user.model'

export const desbloqueoTiempo = async ({
  userId,
}: {
  userId?: number;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        numIntentos: 0,
        status: "H",
      },
      {
        where: { id: userId },
      }
    );
  } catch (err) {
    throw err;
  }
};
export const desbloqueoUsuario = async ({
  userId,
}: {
  userId?: number;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        hora_bloqueo: undefined,
        cantidad_min_bloqueado: undefined,
        numIntentos: 0,
        status: "H",
      },
      {
        where: { id: userId },
      }
    );
  } catch (err) {
    throw err;
  }
};
export const actualizarNumIntentos = async ({
  userId,
  numIntentos,
}: {
  userId?: number;
  numIntentos?: number;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        numIntentos: numIntentos,
      },
      {
        where: { id: userId },
      }
    );
  } catch (err) {
    throw err;
  }
};
export const bloqueoUsuario = async ({
  userId,
}: {
  userId?: number;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        status: "BI", //* BI == BLOQUEO
      },
      {
        where: { id: userId },
      }
    );
  } catch (err) {
    throw err;
  }
};
export const bloqueoUsuarioTemporal = async ({
  userId,
  cantminutos,
}: {
  userId?: number;
  cantminutos?: number;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        hora_bloqueo: new Date(),
        cantidad_min_bloqueado: cantminutos,
        status: "BIT",
      },
      {
        where: { id: userId },
      }
    );
  } catch (err) {
    throw err;
  }
};
export const updateUserById = async ({
  id,
  number_of_sessions,
  cellphone,
  name,
  lastname,
  nightmode,
}: {
  id?: number;
  number_of_sessions?: number;
  cellphone?: number;
  name?: string;
  lastname?: string;
  nightmode?: boolean;
}): Promise<any> => {
  try {
    return await DataBase.instance.user.update(
      {
        number_of_sessions,
        cellphone,
        name,
        lastname,
        updated: moment.utc().toDate(),
        nightmode,
      },
      {
        where: {
          id,
          state: true,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

export const updateUserStateCodeVerification = async ({
  state,
  email,
}: {
  state: boolean;
  email: string;
}): Promise<any> => {
  return await DataBase.instance.user.update(
    {
      state,
    },
    {
      where: {
        email,
      },
    }
  );
};

export const updateUser = async ({
  where,
  user,
}: {
  where: WhereOptions<UserAttributes>;
  user: UserAttributes;
}): Promise<any> => {
  return await DataBase.instance.user.update(
    { ...user },
    {
      where,
    }
  );
};

export const updateIdDevice = async (device_id: string, userId: number) => {
  try {
    const user = await DataBase.instance.user.update(
      {
        device_id,
        updated: moment().toDate(),
        // updated_data: new Date(),
      },
      {
        where: { id: userId },
      }
    );

    return user;
  } catch (err) {
    throw err;
  }
};

export const updatePasswordUser = async ({
  where,
  // updated_by,
  salt,
  password,
}: {
  where: WhereOptions<UserAttributes>;
  // updated_by?: number
  salt: string;
  password: string;
}) => {
  try {
    return await DataBase.instance.user.update(
      {
        // updated_by,
        updated: moment.utc().toDate(),
        salt,
        password,
      },
      {
        where,
      }
    );
  } catch (err) {
    throw err;
  }
};

/* export const updateUser = async ({
  id,
  state,
  key,
  path,
  size,
  code_departamento,
  code_provincia,
  ubigeo,
  name_departamento,
  name_provincia,
  name_distrito,
}: {
  id: number;
  state?: boolean;
  key?: string;
  path?: string;
  size?: string;
  code_departamento?: number;
  code_provincia?: number;
  ubigeo?: number;
  name_departamento?: string;
  name_provincia?: string;
  name_distrito?: string;
}) => {
  try {
    return await DataBase.instance.noticia.update(
      {
        updated: moment.utc().toDate(),
        state,
        key,
        path,
        size,
        code_departamento,
        code_provincia,
        ubigeo,
        name_departamento,
        name_provincia,
        name_distrito,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (err) {
    throw err;
  }
}; */
