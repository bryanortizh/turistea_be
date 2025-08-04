import { DataBase } from '../../../../database'
import moment from 'moment'
import { TermsAndConditionsAttributes } from '../../models/termsconditions.model'

export const createTermsAndConditions = async ({ termsConditions }: { termsConditions: TermsAndConditionsAttributes }) => {
  try {
    return await DataBase.instance.termsAndConditions.create({
      created: moment().toDate(),
      ...termsConditions,
    })
  } catch (err) {
    throw err
  }
}
