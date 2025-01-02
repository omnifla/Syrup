
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "languageName": "English",
            "Coupons": "Coupons",
        },
    },
    de: {
        translation: {
            "languageName": "Deutsch",
            "Coupons": "Gutscheine",
        },
    }
}

i18n.use(
    initReactI18next // passes i18n to react-i18next
).init({
    resources: resources,
    lng: "en", // could change this to a language detector
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;