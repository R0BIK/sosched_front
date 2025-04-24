export const SignFormCheck = {
    Name: /^[^\d\s]{2,}$/,
    LastName: /^[^\d\s]{2,}$/,
    Email: /^\S+@\S+\.\S+$/,
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
}