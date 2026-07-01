import i18n from "i18next";
import { initReactI18next } from "react-i18next";

console.log("🚀 i18n.ts FILE LOADED");

const resources = {
  en: {
    translation: {
      home: "Home",
    },
  },

  hi: {
    translation: {
      home: "होम",
    },
  },
};

console.log("📦 Resources Loaded:", resources);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("✅ i18next INITIALIZED");
    console.log("🌐 Current Language:", i18n.language);
    console.log(
      "🔄 changeLanguage Exists:",
      typeof i18n.changeLanguage
    );
    console.log("📋 i18n Instance:", i18n);
  })
  .catch((err) => {
    console.error(
      "❌ i18next Initialization Error:",
      err
    );
  });

export default i18n;