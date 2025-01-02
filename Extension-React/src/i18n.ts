import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import universalLanguageDetect from "@unly/universal-language-detector";

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
            "Domain seems to be invalid?": "Domain scheint ungültig zu sein",
        },
    }
}

// get these from JSON file (supportedLanguages, fallbackLanguage)?
const language = universalLanguageDetect({
    supportedLanguages: ['en', 'de', 'cz', 'pt', 'ro', ], // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: 'en', // Fallback language in case the user's language cannot be resolved
})

export const languages = Object.keys(resources);
export const languageNames = languages.map((lang) => resources[lang as keyof typeof resources].translation.languageName);

i18n
    // passes i18n to react-i18next
    .use(initReactI18next)
    .init({
    resources: resources,
    lng: language,
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;