import { VALIDATION_MESSAGES, REGEXPS } from 'Core/constants/clientValidation';

const isLessThen2Symbols = (value) => value.length < 2;
const isNameValidated = (value) => REGEXPS.NAME.test(value);


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
                    if (isLessThen2Symbols(value)) return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
                    if (!isNameValidated(value)) {
                        return Promise.reject('Имя не соответствует требованиям');
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
                    if (isLessThen2Symbols(value)) return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
                    if (!isNameValidated(value)) {
                        return Promise.reject('Фамилия не соответствует требованиям');
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
                    if (isLessThen2Symbols(value)) return Promise.reject(VALIDATION_MESSAGES.LESS_THEN_2SYMB);
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
                    const condition = REGEXPS.EMAIL.test(value);
                    if (!condition) {
                        return Promise.reject('Почта не соответствует требованиям');
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
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject(VALIDATION_MESSAGES.REQUIRED);

                    const condition = REGEXPS.PASSWORD.test(value);
                    if (!condition) {
                        return Promise.reject('Пароль не соответствует требованиям');
                    }

                    return Promise.resolve();
                },
            },
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
