import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import AppConfig from "../../configs/AppConfig";
const { LANGUAGE_OPTIONS } = AppConfig;
const LanguageSwitch = (props) => {
  const { className } = props;
  const { t, i18n } = useTranslation();
  const changeLanguage = async (e) => {
    await i18n.changeLanguage(e.target.value);
  };
  return (
    <div className={`language ${className}`}>
      <Select
        defaultValue={i18n.language}
        inputProps={{ "aria-label": "Without label" }}
        onChange={changeLanguage}
        className="language-select"
      >
        {LANGUAGE_OPTIONS.map((lang) => (
          <MenuItem value={lang.value} defaultValue={i18n.language}>
            <div className="flex gap-x-1 w-full items-center">
              <img src={lang.image} className="w-8 h-auto" alt={lang.label} />
              <span>{t(lang.label)}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default withTranslation()(LanguageSwitch);
