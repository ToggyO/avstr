import { validatePasswordBySteps } from 'Core/ant/helpers';

const formOptions = {
    password: {
        props: {
            size: 'large',
            placeholder: 'Новый пароль',
        },
        rules: [
            {
                required: true,
                message: 'Поле обязательно для заполнения',
            },
            (form) => ({
                validator: (_, value) => {
                    const validationObj = {
                        patternMinLength: value && /.{8,}/.test(value),
                        patternUppSyms: /[A-Z]+/.test(value),
                        patternLowSyms: value && /[a-z]+/.test(value),
                        patternNums: /[0-9]+/.test(value),
                        patternSpecSymb: /[!"#$%&'()*+,-.:;<=>?@^_`[\]{|}~\\]/.test(value),
                    };
                    return validatePasswordBySteps(form, validationObj, 'password');
                },
            }),
        ],
    },
    confirmPassword: {
        props: {
            size: 'large',
            placeholder: 'Повторите пароль',
        },
        dependencies: ['password'],
        rules: [
            {
                required: true,
                message: ' ',
            },
            ({ getFieldValue }) => ({
                validator: (_, value) => {
                    if (!value) return Promise.reject('Поле обязательно для заполнения');

                    if (value !== getFieldValue('password')) {
                        return Promise.reject('Пароли не совпадают');
                    }

                    return Promise.resolve();
                },
            }),
        ],
    },
    submit: {
        props: {
            size: 'large',
            type: 'primary',
            // обязательно поле htmlType 'submit' для кнопки сабмита
            htmlType: 'submit',
            style: {
                width: '100%',
            },
        },
    },
};

export default formOptions;
