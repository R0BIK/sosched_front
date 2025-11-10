export const SIGN_FORM_CHECK = {
    FIRST_NAME: /^[^\d\s]{2,}$/,
    LAST_NAME: /^[^\d\s]{2,}$/,
    EMAIL: /^\S+@\S+\.\S+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    NEW_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
}