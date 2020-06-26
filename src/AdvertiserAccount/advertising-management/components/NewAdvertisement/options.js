import { compareDateWithToday } from 'Core/utils/formatDate';
// import { VALIDATION_MESSAGES } from 'Core/constants';

const formOptions = {
    advertiserEmail: {
        label: 'Рекламодатель',
        props: {
            size: 'large',
            placeholder: 'Почта рекламодателя',
        },
        // rules: [
        //     {
        //         required: true,
        //         message: VALIDATION_MESSAGES.REQUIRED,
        //     },
        // ],
    },
    name: {
        label: 'Название объявления',
        props: {
            size: 'large',
        },
        // rules: [
        //     {
        //         required: true,
        //         message: VALIDATION_MESSAGES.REQUIRED,
        //     },
        // ],
    },
    rangeDate: {
        label: 'Даты показа',
        props: {
            size: 'large',
            placeholder: ['Дата начала', 'Дата окончания'],
            disabledDate: (currentDate) => compareDateWithToday(currentDate),
        },
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Выберите дату начала и дату окончания',
            },
        ],
    },
    frequency: {
        label: 'Частота показа в сутки',
        props: {
            size: 'large',
            min: 1,
            parser: (value) => value.replace(/\.s?|(,*)[^-0-9]/gim, ''),
        },
        // rules: [
        //     {
        //         required: true,
        //         message: VALIDATION_MESSAGES.REQUIRED,
        //     },
        // ],
    },
    ticketId: {
        label: 'ID тикета',
        props: {
            size: 'large',
        },
        extra: 'Необязательное поле',
    },
    fileList: {
        label: 'Медиафайл',
    },
    cancel: {
        props: {
            size: 'large',
        },
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
