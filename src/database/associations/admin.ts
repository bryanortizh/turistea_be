import { AdminStatic } from '../../api/admin/models/admin.model'
import { AdminRolesStatic } from '../../api/admin/models/admin.roles'

//*@DESC Admin has many admin roles
export const adminHasManyAdminRoles = ({
  admin,
  adminRoles,
}: {
  admin: AdminStatic
  adminRoles: AdminRolesStatic
}): void => {
  adminRoles.hasMany(admin, {
    foreignKey: 'admin_rol_id',
    sourceKey: 'id',
  })
  admin.belongsTo(adminRoles, {
    foreignKey: 'admin_rol_id',
    targetKey: 'id',
  })
}
