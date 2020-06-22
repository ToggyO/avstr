import { VALIDATION_MESSAGES } from 'Core/constants';

const formOptions = {
    email: {
        props: {
            size: 'large',
            placeholder: 'Электронная почта',
        },
        rules: [
            {
                required: true,
                message: VALIDATION_MESSAGES.REQUIRED,
            },
            {
                pattern: /^[!#$%&'*+-/=?^_{|}~.\w]+@\w+\.\w+$/,
                message: VALIDATION_MESSAGES.INCORRECT_EMAIL,
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
