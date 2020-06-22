import { validatePasswordBySteps } from 'Core/ant/helpers';
import { VALIDATION_MESSAGES } from 'Core/constants';

const formOptions = {
    password: {
        props: {
            size: 'large',
            placeholder: 'Новый пароль',
        },
        rules: [
            {
                required: true,
                message: VALIDATION_MESSAGES.REQUIRED,
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
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);

                    if (value !== getFieldValue('password')) {
                        return Promise.reject(VALIDATION_MESSAGES.PASSWORD_NOT_CONFIRMED);
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
