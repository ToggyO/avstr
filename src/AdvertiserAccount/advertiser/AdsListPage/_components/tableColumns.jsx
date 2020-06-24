import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { formatDate } from 'Core/utils/formatDate';
import { MediaFile } from 'Core/ant/components/Table/_components';
import { ADVERTISEMENT_STATUS, ADVERTISEMENT_TAG } from 'Core/constants';
import ADVERTISER_ROUTES from '../../constants/routes';

const getColumns = () => [
    {
        title: <p className="custom-ant-table__title">Загружено</p>,
        dataIndex: 'creationTime',
        align: 'left',
        ellipsis: true,
        width: '10%',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: false,
        render: (creationTime) => formatDate(creationTime),
    },
    {
        title: <p className="custom-ant-table__title">Медиафайл</p>,
        dataIndex: 'url',
        align: 'left',
        ellipsis: true,
        width: '8%',
        render: (value) => (
            <span onClick={() => window.open(value)}>
                <MediaFile src={value} />
            </span>
        ),
    },
    {
        title: <p className="custom-ant-table__title">Название</p>,
        dataIndex: 'name',
        align: 'left',
        ellipsis: true,
        width: '20%',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: false,
        render: (name, record) => <Link to={`${ADVERTISER_ROUTES.ADVERTISEMENT_DETAILS(record.id)}`}>{name}</Link>,
    },
    {
        title: <p className="custom-ant-table__title">Статус</p>,
        dataIndex: 'status',
        align: 'left',
        ellipsis: true,
        className: 'custom-table-row',
        width: '10%',
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
        render: (value) => (
            <Tag color={ADVERTISEMENT_TAG[value]}>
                {ADVERTISEMENT_STATUS[value]}
            </Tag>
        ),
    },
    {
        title: <p className="custom-ant-table__title">Начало</p>,
        dataIndex: 'startDate',
        align: 'left',
        ellipsis: true,
        width: '10%',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: false,
        render: (value) => formatDate(value),
    },
    {
        title: <p className="custom-ant-table__title">Окончание</p>,
        dataIndex: 'endDate',
        align: 'left',
        ellipsis: true,
        width: '10%',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: false,
        render: (value) => formatDate(value),
    },
    {
        title: <p className="custom-ant-table__title">Частота (в сутки)</p>,
        dataIndex: 'frequency',
        align: 'right',
        ellipsis: true,
        width: '12%',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: false,
    },
    {
        title: <p className="custom-ant-table__title">Кол-во показов</p>,
        dataIndex: 'viewsCount',
        align: 'right',
        ellipsis: true,
        width: '12%',
        // sortDirections: ['descend', 'ascend'],
        // sorter: true,
        // sortOrder: false,
    },
];

export default getColumns;
