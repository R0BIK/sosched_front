export const AUTH_FORM_CHECK = {
    FirstName: /^[^\d\s]{2,}$/,
    LastName: /^[^\d\s]{2,}$/,
    Email: /^\S+@\S+\.\S+$/,
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
}