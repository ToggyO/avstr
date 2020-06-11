const requiredFieldWarning = 'Обязательное поле';
const lessThen2SymbolsWarning = 'Необходимо минимум 2 символа';
const isLessThen2Symbols = (value) => value.length < 2;
const isNameValidated = (value) => /^[a-zа-яё]+$/i.test(value);

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
                    if (!value) return Promise.reject(requiredFieldWarning);
                    if (isLessThen2Symbols(value)) return Promise.reject(lessThen2SymbolsWarning);
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
                    if (!value) return Promise.reject(requiredFieldWarning);
                    if (isLessThen2Symbols(value)) return Promise.reject(lessThen2SymbolsWarning);
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
                    if (!value) return Promise.reject(requiredFieldWarning);
                    if (isLessThen2Symbols(value)) return Promise.reject(lessThen2SymbolsWarning);

                    // const condition = /\w+/g.test(value);
                    /* if (condition) {
                        return Promise.reject('Имя организации не соответствует требованиям');
                    } */

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
                    if (!value) return Promise.reject(requiredFieldWarning);
                    const condition = /^[!#$%&'*+-/=?^_{|}~.\w]+@\w+\.\w+$/.test(value);
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
                    if (!value) return Promise.reject(requiredFieldWarning);

                    const condition = (
                        /(?=.*[0-9])(?=.*[!"#$%&'()*+,-.:;<=>?@^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
                            .test(value)
                    );
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
