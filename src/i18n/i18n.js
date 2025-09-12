import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { LOCALES, resources } from "./resources.js";

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources,
    fallbackLng: LOCALES.EN.KEY,
    lng: localStorage.getItem('i18nextLng') || LOCALES.EN.KEY,
    ns: ['auth', 'global'],
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie'],
    }
});