import { NoticiaStatic } from '../../api/noticia/models/noticia.model'

import { DepartamentoTypeStatic } from '../../api/ubicacion/models/departamento.model'

import { ProvinciaStatic } from '../../api/ubicacion/models/provincia.model'
import { DistritoStatic } from '../../api/ubicacion/models/distrito.model'

export const noticiaHasManyDepartamento = ({
  departamento,
  noticia,
}: {
  departamento: DepartamentoTypeStatic
  noticia: NoticiaStatic
}): void => {
  departamento.hasMany(noticia, {
    foreignKey: { name: 'region_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  noticia.belongsTo(departamento, {
    foreignKey: { name: 'region_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const noticiaHasManyProvincia = ({
  provincia,
  noticia,
}: {
  provincia: ProvinciaStatic
  noticia: NoticiaStatic
}): void => {
  provincia.hasMany(noticia, {
    foreignKey: { name: 'prov_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  noticia.belongsTo(provincia, {
    foreignKey: { name: 'prov_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const noticiaHasManyDistrito = ({
  distrito,
  noticia,
}: {
  distrito: DistritoStatic
  noticia: NoticiaStatic
}): void => {
  distrito.hasMany(noticia, {
    foreignKey: { name: 'distrito_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  noticia.belongsTo(distrito, {
    foreignKey: { name: 'distrito_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
