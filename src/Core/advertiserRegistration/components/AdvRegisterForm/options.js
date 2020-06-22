import VALIDATION_MESSAGES from 'Core/constants/clientValidation';
import * as validation from 'Core/utils/validation';

import { validatePasswordBySteps } from 'Core/ant/helpers';


const formOptions = {
    name: {
        props: {
            size: 'large',
            placeholder: 'Имя',
            maxLength: 35,
        },
        rules: [
            {
                required: true,
                // при устройстве кастомной валидации нужно оставлять пробел в поле message
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);
                    if (validation.isLessThen2Symbols(value)) {
                        return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
                    }
                    if (!validation.isNameValid(value)) {
                        return Promise.reject('Введите корректное имя');
                    }

                    return Promise.resolve();
                },
            },
        ],
    },
    surname: {
        props: {
            size: 'large',
            placeholder: 'Фамилия',
            maxLength: 35,
        },
        rules: [
            {
                required: true,
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);
                    if (validation.isLessThen2Symbols(value)) {
                        return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
                    }
                    if (!validation.isNameValid(value)) {
                        return Promise.reject('Введите корректную фамилию');
                    }

                    return Promise.resolve();
                },
            },
        ],
    },
    organization: {
        props: {
            size: 'large',
            placeholder: 'Организация',
            maxLength: 300,
        },
        rules: [
            {
                required: true,
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);
                    if (validation.isLessThen2Symbols(value)) {
                        return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
                    }
                    return Promise.resolve();
                },
            },
        ],
    },
    email: {
        props: {
            size: 'large',
            placeholder: 'Электронная почта',
        },
        rules: [
            {
                required: true,
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);
                    if (!validation.isEmailValid(value)) {
                        return Promise.reject(VALIDATION_MESSAGES.INCORRECT_EMAIL);
                    }

                    return Promise.resolve();
                },
            },
        ],
    },
    password: {
        props: {
            size: 'large',
            placeholder: 'Придумайте пароль',
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
    submit: {
        props: {
            size: 'large',
            type: 'primary',
            htmlType: 'submit',
        },
    },
};

export default formOptions;
