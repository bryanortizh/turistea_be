import { GuideStatic } from "../../api/guide/models/guide.model";
import { PackagesStatic } from "../../api/package/models/package.model";

export const guideHasManyPackages = ({
  package: pkg,
  guide,
}: {
  package: PackagesStatic;
  guide: GuideStatic;
}): void => {
  guide.hasMany(pkg, {
    foreignKey: "id_guide",
    sourceKey: "id",
  });
  pkg.belongsTo(guide, {
    foreignKey: "id_guide",
    targetKey: "id",
  });
};
