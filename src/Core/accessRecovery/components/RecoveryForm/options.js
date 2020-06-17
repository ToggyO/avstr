const formOptions = {
    email: {
        props: {
            size: 'large',
            placeholder: 'Электронная почта',
        },
        rules: [
            {
                required: true,
                message: 'Поле обязательно для заполнения',
            },
            {
                pattern: /^[!#$%&'*+-/=?^_{|}~.\w]+@\w+\.\w+$/,
                message: 'Невалидный адрес эелектронной почты',
            },
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
