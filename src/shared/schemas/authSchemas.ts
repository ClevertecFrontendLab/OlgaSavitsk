import * as yup from 'yup';

export const loginSchema = yup.object({
    login: yup.string().max(50, 'Максимальная длина 50 символов').required('Введите логин'),
    password: yup.string().max(50, 'Максимальная длина 50 символов').required('Введите пароль'),
});

export const signupSchema = yup
    .object()
    .shape({
        firstName: yup
            .string()
            .required('Введите имя')
            .matches(/^[А-ЯЁ]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-ЯЁа-яё-]+$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),

        lastName: yup
            .string()
            .required('Введите фамилию')
            .matches(/^[А-ЯЁ][а-яё-]+$/, 'Должно начинаться с кириллицы А-Я')
            .max(50, 'Максимальная длина 50 символов'),

        email: yup
            .string()
            .required('Введите e-mail')
            .email('Введите корректный e-mail')
            .max(50, 'Максимальная длина 50 символов'),

        login: yup
            .string()
            .required('Введите логин')
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату'),

        password: yup
            .string()
            .required('Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^[A-Za-z0-9!@#$&_+.-]+$/, 'Не соответствует формату'),

        confirmPassword: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required();
