const Email = {
    id: "Email",
    name: 'email',
    placeholder: "Email",
    type: 'email',
    autoComplete: 'email',
    isSaving: true,
}

const Password = {
    id: "Password",
    name: 'password',
    placeholder: "Пароль",
    type: 'password',
    autoComplete: 'current-password',
    isSaving: false,
}

const FirstName = {
    id: "FirstName",
    name: 'firstName',
    placeholder: 'Імʼя',
    type: 'text',
    autoComplete: 'given-name',
    isSaving: true,
}

const LastName = {
    id: "LastName",
    name: 'lastName',
    placeholder: 'Прізвище',
    type: 'text',
    autoComplete: 'family-name',
    isSaving: true,
}

export const ERRORS = {
    FirstName: "Не правильний формат імʼя.",
    LastName: "Не правильний формат прізвища.",
    Email: "Не правильний формат E-mail.",
    Password: "Не правильний формат паролю.",
}

export const LOGIN_FIELDS = [Email, Password];
export const REGISTER_FIELDS = [FirstName, LastName, Email, Password];