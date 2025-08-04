import { TipCategoryStatic } from "../../api/tip/models/tip.category.model";
import { TipStatic } from "../../api/tip/models/tip.model";

export const tipCategoryHasManyTip = ({
  tipCategory,
  tip,
}: {
  tipCategory: TipCategoryStatic;
  tip: TipStatic;
}): void => {
  tipCategory.hasMany(tip, {
    foreignKey: { allowNull: true, name: "tip_category_id" },
    sourceKey: "id",
  });
  tip.belongsTo(tipCategory, {
    foreignKey: { allowNull: true, name: "tip_category_id" },
    targetKey: "id",
  });
};
