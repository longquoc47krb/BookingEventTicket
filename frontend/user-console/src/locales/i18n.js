import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./translations/en-US.json";
import vn from "./translations/vn.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: en,
      },
      vn: {
        translations: vn,
      },
    },
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
