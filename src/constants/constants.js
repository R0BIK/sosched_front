export const API_BASE_URL = "http://localhost:5056";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        CHECK_AUTH: "/auth/me",
    },
    USER: "/users",
    SPACE: "/spaces",
    EVENT: "/events",
    EVENT_TYPE: "/eventTypes",
    TAG: "/tags",
    TAG_TYPE: "/tagTypes",
    SEARCH: "/search",
}

export const LOCAL_STORAGE_NAMES = {
    ACTIVE_SPACE: "activeSpace"
}

export const DRAWER_MODES = {
    CREATE: "create",
    INFO: "info",
    EDIT: "edit"
}


export const AUTH_TYPES = {
    LOGIN: "SIGN_IN",
    REGISTER: "SIGN_UP",
}

export const getSignFormData = (t) => ({
    FIELDS: {
        FIRST_NAME: {
            name: 'firstName',
            placeholder: t('auth:fields:name'),
            type: 'text',
            autoComplete: 'given-name',
            isSaving: true,
        },

        LAST_NAME: {
            name: 'lastName',
            placeholder: t('auth:fields:lastName'),
            type: 'text',
            autoComplete: 'family-name',
            isSaving: true,
        },

        EMAIL: {
            name: 'email',
            placeholder: t('auth:fields:email'),
            type: 'email',
            autoComplete: 'email',
            isSaving: true,
        },

        PASSWORD: {
            name: 'password',
            placeholder: t('auth:fields:password'),
            type: 'password',
            autoComplete: 'current-password',
            isSaving: false,
        },

        NEW_PASSWORD: {
            name: 'password',
            placeholder: t('auth:fields:password'),
            type: 'password',
            autoComplete: 'new-password',
            isSaving: false,
        },
    },

    MAIN: {
        SIGN_UP: {
            name: "sign-up-form",
            title: t('auth:signUp:title'),
            button: t('auth:signUp:button'),
            alternativeText: t('auth:signUp:alternative'),
            alternative: t('auth:signIn:button'),
            alternativeLink: "/SignIn",
            additional: t('auth:signUp:additional'),
            fields: ['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'NEW_PASSWORD'],
        },
        SIGN_IN: {
            name: "sign-in-form",
            title: t('auth:signIn:title'),
            button: t('auth:signIn:button'),
            alternativeText: t('auth:signIn:alternative'),
            alternative: t('auth:signUp:button'),
            alternativeLink: "/SignUp",
            additional: t('auth:signIn:additional'),
            fields: ['EMAIL', 'PASSWORD'],
        },
    },

    ERRORS: {
        FIRST_NAME: "Не правильний формат імʼя.",
        LAST_NAME: "Не правильний формат прізвища.",
        EMAIL: "Не правильний формат E-mail.",
        PASSWORD: "Не правильний формат паролю.",
        NEW_PASSWORD: " ",
    },
});



export const SPECIAL = {
    STRING: {
        EMPTY: '',
        SPACE: ' ',
    },

    TAG_COLORS: {
        gray: {
            bg: "#f3f4f6",   // bg-gray-100
            text: "#4b5563", // text-gray-600
            name: "Gray",
        },
        red: {
            bg: "#fee2e2",   // bg-red-100
            text: "#b91c1c", // text-red-700
            name: "Red",
        },
        yellow: {
            bg: "#fef9c3",   // bg-yellow-100
            text: "#854d0e", // text-yellow-800
            name: "Yellow",
        },
        green: {
            bg: "#dcfce7",   // bg-green-100
            text: "#15803d", // text-green-700
            name: "Green",
        },
        blue: {
            bg: "#dbeafe",   // bg-blue-100
            text: "#1d4ed8", // text-blue-700
            name: "Blue",
        },
        indigo: {
            bg: "#e0e7ff",   // bg-indigo-100
            text: "#4338ca", // text-indigo-700
            name: "Indigo",
        },
        purple: {
            bg: "#f3e8ff",   // bg-purple-100
            text: "#6b21a8", // text-purple-700
            name: "Purple",
        },
        pink: {
            bg: "#fce7f3",   // bg-pink-100
            text: "#be185d", // text-pink-700
            name: "Pink",
        },
    },

    KEYBOARD_KEYS: {
        Enter: {
            name: 'Enter',
            KeyboardEvent: new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
            }),
        }
    },
}