import React from "react";
import { useTranslation } from "react-i18next";
import { categoryIcon } from "../data/dummy";

function CategoryItem({ category, icon, onClick }) {
  const { t } = useTranslation();
  return (
    <div
      className="btn-grad m-2 rounded-md p-4 min-h-[100px] flex items-start gap-x-8"
      onClick={onClick}
    >
      {categoryIcon(icon)}
      <h1 className="text-white font-bold text-xl text-center">
        {t(category?.name)}
      </h1>
    </div>
  );
}

export default CategoryItem;
