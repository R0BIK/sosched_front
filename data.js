export const getSignFormData = (t) => ({
    Fields: {
        Name: {
            name: 'name',
            placeholder: t('auth:fields:name'),
            type: 'text',
            autoComplete: 'given-name',
            isSaving: true,
        },

        LastName: {
            name: 'lastName',
            placeholder: t('auth:fields:lastName'),
            type: 'text',
            autoComplete: 'family-name',
            isSaving: true,
        },

        Email: {
            name: 'email',
            placeholder: t('auth:fields:email'),
            type: 'email',
            autoComplete: 'email',
            isSaving: true,
        },

        Password: {
            name: 'password',
            placeholder: t('auth:fields:password'),
            type: 'Password',
            autoComplete: 'current-password',
            isSaving: false,
        },

        NewPassword: {
            name: 'newPassword',
            placeholder: t('auth:fields:password'),
            type: 'Password',
            autoComplete: 'new-password',
            isSaving: false,
        },
    },

    Main: {
        SignUp: {
            name: "sign-up-form",
            title: t('auth:signUp:title'),
            button: t('auth:signUp:button'),
            alternativeText: t('auth:signUp:alternative'),
            alternative: t('auth:signIn:button'),
            alternativeLink: "/SignIn",
            additional: t('auth:signUp:additional'),
            fields: ['Name', 'LastName', 'Email', 'NewPassword'],
        },
        SignIn: {
            name: "sign-in-form",
            title: t('auth:signIn:title'),
            button: t('auth:signIn:button'),
            alternativeText: t('auth:signIn:alternative'),
            alternative: t('auth:signUp:button'),
            alternativeLink: "/SignUp",
            additional: t('auth:signIn:additional'),
            fields: ['Email', 'Password'],
        },
    },

    Errors: {
        Name: "Only letters and '-' are allowed.",
        LastName: "Only letters and '-' are allowed.",
        Email: "Only letters and '-' in name",
        Password: "Only letters and '-' are allowed.",
        NewPassword: " ",
    },
})

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