import { TerraceStatic } from "../../api/terrace/models/terrace.model";
import { PackagesStatic } from "../../api/package/models/package.model";

export const terraceHasManyPackages = ({
  package: pkg,
  terrace,
}: {
  package: PackagesStatic;
  terrace: TerraceStatic;
}): void => {
  terrace.hasMany(pkg, {
    foreignKey: "id_terrace",
    sourceKey: "id",
  });
  pkg.belongsTo(terrace, {
    foreignKey: "id_terrace",
    targetKey: "id",
  });
};