// TODO(toleg): пересмотреть послу подключения к API
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { formatDate } from '../../../../Core/utils/formatDate';

const getColumns = () => [
    {
        title: 'Загружено',
        dataIndex: 'creationTime',
        // defaultSortOrder: 'descend',
        align: 'left',
        ellipsis: true,
        render: (creationTime) => formatDate(creationTime),
    },
    {
        title: 'Медиафайл',
        dataIndex: 'url',
        align: 'center',
        ellipsis: true,
        render: () => <img width={100} src="https://images.unsplash.com/photo-1592395834485-b119374bc3f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=928&q=80" alt="" />,
    },
    {
        title: 'Название',
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.name < b.name,
        render: (name) => <Link to="/advertiser/advertisements/1">{name}</Link>,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        align: 'center',
        ellipsis: true,
        // filters: [
        //     {
        //         text: 'Активные',
        //         value: 0,
        //     },
        //     {
        //         text: 'Ожидают показа',
        //         value: 1,
        //     },
        //     {
        //         text: 'Приостановленные',
        //         value: 2,
        //     },
        //     {
        //         text: 'Завершенные',
        //         value: 3,
        //     },
        // ],
        // onFilter: (value, record) => record.state === value,
        render: (state) => (
            <Tag color="red" key={state}>
                {state}
            </Tag>
        ),
    },
    {
        title: 'Начало',
        dataIndex: 'startTime',
        align: 'center',
        ellipsis: true,
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.startTime - b.startTime,
        render: (startTime) => formatDate(startTime),
    },
    {
        title: 'Окончание',
        dataIndex: 'endTime',
        align: 'center',
        ellipsis: true,
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.endTime - b.endTime,
        render: (endTime) => formatDate(endTime),
    },
    {
        title: 'Частота (в сутки)',
        dataIndex: 'frequency',
        align: 'center',
        // ellipsis: true,
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Кол-во показов',
        dataIndex: '',
        align: 'center',
        ellipsis: true,
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
];

export default getColumns;
