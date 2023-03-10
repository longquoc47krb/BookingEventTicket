import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Unauthenticated() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="unauthenticated-container">
      <span className="text-xl font-medium">{t("unauthenticated")}</span>
      <button
        onClick={() => navigate("/login")}
        className="primary-button w-auto"
      >
        {t("signin")}
      </button>
    </div>
  );
}

export default Unauthenticated;
