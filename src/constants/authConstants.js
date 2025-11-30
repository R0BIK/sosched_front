const Email = {
    id: "email",
    name: 'email',
    placeholder: "Email",
    type: 'email',
    autoComplete: 'email',
    isSaving: true,
}

const Password = {
    id: "password",
    name: 'password',
    placeholder: "Пароль",
    type: 'password',
    autoComplete: 'current-password',
    isSaving: false,
}

const FirstName = {
    id: "firstName",
    name: 'firstName',
    placeholder: 'Імʼя',
    type: 'text',
    autoComplete: 'given-name',
    isSaving: true,
}

const LastName = {
    id: "lastName",
    name: 'lastName',
    placeholder: 'Прізвище',
    type: 'text',
    autoComplete: 'family-name',
    isSaving: true,
}

export const ERRORS = {
    firstName: "Не правильний формат імʼя.",
    lastName: "Не правильний формат прізвища.",
    email: "Не правильний формат E-mail.",
    password: "Пароль не правильний.",
}

export const LOGIN_FIELDS = [Email, Password];
export const REGISTER_FIELDS = [FirstName, LastName, Email, Password];