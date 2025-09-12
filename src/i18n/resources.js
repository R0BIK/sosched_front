import auth_en from './locales/en/auth.json';
import auth_uk from './locales/uk/auth.json';
import auth_ru from './locales/ru/auth.json';

import global_en from './locales/en/global.json';
import global_uk from './locales/uk/global.json';
import global_ru from './locales/ru/global.json';

export const LOCALES = {
    EN: "en",
    UK: "uk",
    RU: "ru",
}

export const LOCALES_TEXT = {
    [LOCALES.EN]: "English",
    [LOCALES.UK]: "Українська",
    [LOCALES.RU]: "Русский"
}


export const resources = {
    [LOCALES.EN]: { auth: auth_en, global: global_en },
    [LOCALES.UK]: { auth: auth_uk, global: global_uk },
    [LOCALES.RU]: { auth: auth_ru, global: global_ru },
};