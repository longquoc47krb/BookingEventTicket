/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import vn from "./translations/vn.json";
import en from "./translations/en.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      vn: {
        translations: vn,
      },
      en: {
        translations: en,
      },
    },
    fallbackLng: "vn",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
