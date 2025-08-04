import { DepartamentoTypeStatic } from '../../api/ubicacion/models/departamento.model'
import { ProvinciaStatic } from '../../api/ubicacion/models/provincia.model'

export const provinciaHasManyDepartamento = ({
  departamento,
  provincia,
}: {
  departamento: DepartamentoTypeStatic
  provincia: ProvinciaStatic
}): void => {
  departamento.hasMany(provincia, {
    foreignKey: { name: 'region_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  provincia.belongsTo(departamento, {
    foreignKey: { name: 'region_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
