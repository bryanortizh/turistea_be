import { DataBase } from "../../../../database";
import { FormModelReserveAttributes } from "../../model/form_reserve.model";

export const createFormReserve = async (
  formData: FormModelReserveAttributes
): Promise<FormModelReserveAttributes> => {
  try {
    return await DataBase.instance.formReserve.create(formData);
  } catch (err) {
    throw err;
  }
};