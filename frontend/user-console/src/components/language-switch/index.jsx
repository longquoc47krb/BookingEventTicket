import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import AppConfig from "../../configs/AppConfig";
const { LANGUAGE_OPTIONS } = AppConfig;
const LanguageSwitch = (props) => {
  const { className } = props;
  const { t, i18n } = useTranslation();
  const changeLanguage = async (e) => {
    if (i18n.language === "en" || i18n.language === "en-US") {
      await i18n.changeLanguage("vn");
    } else {
      await i18n.changeLanguage("en");
    }
  };
  console.log("language: " + i18n.language);
  return (
    <div className={`language ${className}`}>
      <button className="language-select" onClick={changeLanguage}>
        {i18n.language === "en" || i18n.language === "en-US" ? (
          <MenuItem value={LANGUAGE_OPTIONS[0].value}>
            <div className="flex gap-x-1 w-full items-center ">
              <img
                src={LANGUAGE_OPTIONS[0].image}
                className="w-8 h-auto"
                alt={LANGUAGE_OPTIONS[0].label}
              />
              <span class="tooltip">{t(LANGUAGE_OPTIONS[0].label)}</span>
            </div>
          </MenuItem>
        ) : (
          <MenuItem value={LANGUAGE_OPTIONS[1].value}>
            <div className="flex gap-x-1 w-full items-center">
              <img
                src={LANGUAGE_OPTIONS[1].image}
                className="w-8 h-auto"
                alt={LANGUAGE_OPTIONS[1].label}
              />
              <span class="tooltip">{t(LANGUAGE_OPTIONS[1].label)}</span>
            </div>
          </MenuItem>
        )}
      </button>
      {/* <Select
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
      </Select> */}
    </div>
  );
};

export default withTranslation()(LanguageSwitch);
