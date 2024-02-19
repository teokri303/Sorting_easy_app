import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../src/locales/en.json";
import grTranslation from "../src/locales/gr.json";

i18n
  .use(initReactI18next) // Ενσωμάτωση του i18n στο React
  .init({
    resources: {
      en: {
        translation: enTranslation, // Μεταφράσεις για την αγγλική γλώσσα
      },
      gr: {
        translation: grTranslation, // Μεταφράσεις για την ελληνική γλώσσα
      },
    },
    lng: "en", // Προεπιλεγμένη γλώσσα
    fallbackLng: "en", // Γλώσσα που θα πέσει πίσω αν δεν βρεθεί κάποια μετάφραση
    interpolation: {
      escapeValue: false, // Αποφυγή αποσφαλμάτωσης της εξόδου HTML
    },
    react: {
      useSuspense: false, // Απενεργοποίηση του Suspense mode στο React
    },
  });

export default i18n;
