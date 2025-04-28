export const SignFormData = {
    Fields: {
        Name: {
            name: 'name',
            placeholder: 'Name',
            type: 'text',
            autoComplete: 'given-name',
            isSaving: true,
        },

        LastName: {
            name: 'lastName',
            placeholder: 'Last Name',
            type: 'text',
            autoComplete: 'family-name',
            isSaving: true,
        },

        Email: {
            name: 'email',
            placeholder: 'E-mail',
            type: 'email',
            autoComplete: 'email',
            isSaving: true,
        },

        Password: {
            name: 'password',
            placeholder: 'Password',
            type: 'Password',
            autoComplete: 'password',
            isSaving: false,
        },

        NewPassword: {
            name: 'newPassword',
            placeholder: 'Password',
            type: 'Password',
            autoComplete: 'new-password',
            isSaving: false,
        },
    },

    Main: {
        SignUp: {
            name: "sign-up-form",
            text: "Sign up",
            alternative: "Sign In",
            fields: ['Name', 'LastName', 'Email', 'NewPassword'],
        },
        SignIn: {
            name: "sign-in-form",
            text: "Sign in",
            alternative: "Sign Up",
            additional: "Forgot password?",
            fields: ['Email', 'Password'],
        },
    },

    Errors: {
        Name: "Only letters and '-' are allowed.",
        LastName: "Only letters and '-' are allowed.",
        Email: "Only letters and '-' in name",
        Password: "Only letters and '-' are allowed.",
        NewPassword: "Only letters and '-' are allowed.",
    },

    Name: {
        name: 'name',
        placeholder: 'Name',
        type: 'text',
        autoComplete: 'given-name',
        isSaving: true,
    },

    LastName: {
        name: 'lastName',
        placeholder: 'Last Name',
        type: 'text',
        autoComplete: 'family-name',
        isSaving: true,
    },

    Email: {
        name: 'email',
        placeholder: 'E-mail',
        type: 'email',
        autoComplete: 'email',
        isSaving: true,
    },

    Password: {
        name: 'password',
        placeholder: 'Password',
        type: 'Password',
        autoComplete: 'password',
        isSaving: false,
    },

    NewPassword: {
        name: 'newPassword',
        placeholder: 'Password',
        type: 'Password',
        autoComplete: 'new-password',
        isSaving: false,
    },
}

export const Errors = {
    SignFormErrors: {
        Name: "Only letters and '-' are allowed.",
        LastName: "Only letters and '-' are allowed.",
        Email: "Only letters and '-' in name",
        Password: "Only letters and '-' are allowed.",
        NewPassword: "Only letters and '-' are allowed.",
    }
}

export const SignFormNames = {
    SignUp: {
        name: "sign-up-form",
        text: "Sign up",
        alternative: "Sign In",
    },
    SignIn: {
        name: "sign-in-form",
        text: "Sign in",
        alternative: "Sign Up",
        additional: "Forgot password?",
    },
}

export const Special = {
    String: {
        Empty: '',
        Space: ' ',
    },

    KeyboardKey: {
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
    }
}