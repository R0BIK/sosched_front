export const AUTH_FORM_CHECK = {
    firstName: /^[^\d\s]{2,}$/,
    lastName: /^[^\d\s]{2,}$/,
    email: /^\S+@\S+\.\S+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
}