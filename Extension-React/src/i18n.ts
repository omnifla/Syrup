import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: add actual translations
const resources = {
    'en': {
        translation: {
            "languageName": "English",
            "English": "English",
            "Deutsch": "German",
            "Coupons": "Coupons",
        },
    },
    'de': {
        translation: {
            "languageName": "Deutsch",
            "English": "Englisch",
            "Deutsch": "Deutsch",
            "Coupons": "Gutscheine",
        },
    }
}

export const languages = Object.keys(resources);
export const languageNames = languages.map((lang) => resources[lang as keyof typeof resources].translation.languageName);

i18n
    // passes i18n to react-i18next
    .use(initReactI18next)
    .init({
    resources: resources,
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;