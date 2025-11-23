const EMAIL = {
    key: "EMAIL",
    name: 'email',
    placeholder: "Email",
    type: 'email',
    autoComplete: 'email',
    isSaving: true,
}

const PASSWORD = {
    key: "PASSWORD",
    name: 'password',
    placeholder: "Пароль",
    type: 'password',
    autoComplete: 'current-password',
    isSaving: false,
}

const FIRST_NAME = {
    key: "FIRST_NAME",
    name: 'firstName',
    placeholder: 'Імʼя',
    type: 'text',
    autoComplete: 'given-name',
    isSaving: true,
}

const LAST_NAME = {
    key: "LAST_NAME",
    name: 'lastName',
    placeholder: 'Прізвище',
    type: 'text',
    autoComplete: 'family-name',
    isSaving: true,
}

const NEW_PASSWORD = {
    key: "NEW_PASSWORD",
    name: 'password',
    placeholder: "Пароль",
    type: 'password',
    autoComplete: 'new-password',
    isSaving: false,
}

export const ERRORS = {
    FIRST_NAME: "Не правильний формат імʼя.",
    LAST_NAME: "Не правильний формат прізвища.",
    EMAIL: "Не правильний формат E-mail.",
    PASSWORD: "Не правильний формат паролю.",
    NEW_PASSWORD: " ",
}

export const LOGIN_FIELDS = [EMAIL, PASSWORD];
export const REGISTER_FIELDS = [FIRST_NAME, LAST_NAME, EMAIL, NEW_PASSWORD];