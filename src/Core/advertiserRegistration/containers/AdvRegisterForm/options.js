const formOptions = {
    name: {
        props: {
            size: 'large',
            placeholder: 'Имя',
        },
    },
    surname: {
        props: {
            size: 'large',
            placeholder: 'Фамилия',
        },
    },
    organisation: {
        props: {
            size: 'large',
            placeholder: 'Организация',
        },
    },
    email: {
        props: {
            size: 'large',
            placeholder: 'Электронная почта',
        },
    },
    password: {
        props: {
            size: 'large',
            placeholder: 'Придумайте пароль',
        },
    },
    submit: {
        size: 'large',
        type: 'primary',
        htmlType: 'submit',
        style: {
            width: '100%',
        },
    },
};

export default formOptions;
