import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import universalLanguageDetect from "@unly/universal-language-detector";

const language = universalLanguageDetect({
    supportedLanguages: ["en", "de", "cz", "pt", "ro", "ar"], // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: "en", // Fallback language in case the user's language cannot be resolved
})

export const languages = ["en", "de", "cz", "pt", "ro", "ar"];  // load these from /public/locales?
export const languageNames: Record<string, string> = {
    "en": "English",
    "de": "German",
    "cz": "Czech",
    "pt": "Portuguese",
    "ro": "Romanian",
    "ar": "Arabic",
};

i18n
    // load translations using http from /public/locales
    .use(Backend)
    // passes i18n to react-i18next
    .use(initReactI18next)
    .init({
    lng: language,
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;