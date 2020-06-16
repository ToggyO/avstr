export const VALIDATION_MESSAGES = {
    REQUIRED: 'Обязательное поле',
    LESS_THEN_2SYMB: 'Необходимо минимум 2 символа',
};

export const REGEXPS = {
    NAME: /^[a-zа-яё]+$/i,
    EMAIL: /^[!#$%&'*+-/=?^_{|}~.\w]+@\w+\.\w+$/,
    PASSWORD: /(?=.*[0-9])(?=.*[!"#$%&'()*+,-.:;<=>?@^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
};
