import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import vi from "./translations/vn.json";
import jp from "./translations/jp.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: en,
      },
      vi: {
        translations: vi,
      },
    },
    fallbackLng: "vi",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
