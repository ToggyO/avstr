import { compareDateWithToday } from 'Core/utils/formatDate';
import { VALIDATION_MESSAGES } from 'Core/constants';

const formOptions = {
    advertiserEmail: {
        label: 'Рекламодатель',
        props: {
            placeholder: 'Для поиска начните вводить почту рекламодателя',
        },
        rules: [
            {
                required: true,
                message: VALIDATION_MESSAGES.REQUIRED,
            },
        ],
    },
    name: {
        label: 'Название объявления',
        rules: [
            {
                required: true,
                message: VALIDATION_MESSAGES.REQUIRED,
            },
        ],
    },
    rangeDate: {
        label: 'Даты показа',
        props: {
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
            min: 1,
            parser: (value) => value.replace(/\.s?|(,*)[^-0-9]/gim, ''),
        },
        rules: [
            {
                required: true,
                message: VALIDATION_MESSAGES.REQUIRED,
            },
        ],
    },
    ticketId: {
        label: 'ID тикета',
        extra: 'Необязательное поле',
    },
    fileList: {
        label: 'Медиафайл',
    },
    submit: {
        props: {
            type: 'primary',
            htmlType: 'submit',
        },
    },
};

export default formOptions;
