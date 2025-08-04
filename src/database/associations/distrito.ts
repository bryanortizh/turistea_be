import { ProvinciaStatic } from '../../api/ubicacion/models/provincia.model'
import { DistritoStatic } from '../../api/ubicacion/models/distrito.model'

export const DistritoHasManyProvincia = ({
  provincia,
  distrito,
}: {
  distrito: DistritoStatic
  provincia: ProvinciaStatic
}): void => {
  provincia.hasMany(distrito, {
    foreignKey: { name: 'prov_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  distrito.belongsTo(provincia, {
    foreignKey: { name: 'prov_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
