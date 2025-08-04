
import { DataBase } from '../../../../database'
import { FindAttributeOptions } from 'sequelize/types'

export const findLatestTermsAndConditions = async ({
    attributes,
  }: {
    attributes?: FindAttributeOptions
  }) => {
    try {
      const loantype = await DataBase.instance.termsAndConditions.findAll({
        attributes,
        limit:1,
        order: [['id', 'DESC']],
      })
      return loantype
    } catch (err) {
      throw err
    }
  }