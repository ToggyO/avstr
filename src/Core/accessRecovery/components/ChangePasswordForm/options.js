const formOptions = {
    password: {
        props: {
            size: 'large',
            placeholder: 'Новый пароль',
        },
        rules: [
            {
                required: true,
                message: ' ',
            },
            {
                validator: (_, value) => {
                    if (!value) return Promise.reject('Поле обязательно для заполнения');

                    const condition = (
                        /(?=.*[0-9])(?=.*[!"#$%&'()*+,-.:;<=>?@^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
                            .test(value)
                    );
                    // const condition = /^[0-9a-zA-Z~!@#$%^&*_\-+=`|(){}[\]:;"'<>,.?/]+$/.test(value);
                    if (condition) {
                        return Promise.reject('Пароль не соответствует требованиям');
                    }

                    return Promise.resolve();
                },
            },
        ],
    },
    passwordConfirm: {
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
            htmlType: 'submit',
            style: {
                width: '100%',
            },
        },
    },
};

export default formOptions;
