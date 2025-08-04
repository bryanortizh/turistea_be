import { CommentsStatic } from '../../api/comments_map/models/comments_map.model'
import { UserStatic } from '../../api/user/models/user.model'

export const commentsHasManyUser= ({
  comments,
  user,
}: {
    comments: CommentsStatic
    user: UserStatic
}): void => {
  user.hasMany(comments, {
    foreignKey: { name: 'id_user', allowNull: true },
    sourceKey: 'id',
  })
  comments.belongsTo(user, {
    foreignKey: { name: 'id_user', allowNull: true },
    targetKey: 'id',
  })
}
