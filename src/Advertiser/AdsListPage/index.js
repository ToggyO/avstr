import React from 'react';
// import PropTypes from 'prop-types';
import { Typography, Table, Tag } from 'antd';

import formatDate from 'Core/utils/formatDate';
// import styles from './index.module.scss';

const { Text } = Typography;

const AdsListPage = () => {
    const adsData = [
        {
            key: '1',
            name: 'John Brown',
            creationTime: '2020-06-17T12:08:07.418Z',
            state: 0,
        },
        {
            key: '2',
            name: 'Jim Green',
            creationTime: '2020-06-17T12:08:07.418Z',
            state: 1,
        },
    ];

    const columns = [
        {
            title: 'Загружено',
            dataIndex: 'creationTime',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.creationTime - b.creationTime,
            render: (creationTime) => formatDate(creationTime),
        },
        {
            title: '',
            dataIndex: 'image',
            render: () => <img width={100} src="https://images.unsplash.com/photo-1592395834485-b119374bc3f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=928&q=80" alt="" />,
        },
        {
            title: 'Название',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name < b.name,
            render: (name) => <a href="/">{name}</a>,
        },
        {
            title: 'Статус',
            dataIndex: 'state',
            filters: [
                {
                    text: 'Активные',
                    value: 0,
                },
                {
                    text: 'Ожидают показа',
                    value: 1,
                },
                {
                    text: 'Приостановленные',
                    value: 2,
                },
                {
                    text: 'Завершенные',
                    value: 3,
                },
            ],
            onFilter: (value, record) => record.state === value,
            render: (state) => (
                <Tag color="red" key={state}>
                    {state}
                </Tag>
            ),
        },
        {
            title: 'Начало',
            dataIndex: 'startTime',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.startTime - b.startTime,
            render: (startTime) => formatDate(startTime),
        },
        {
            title: 'Окончание',
            dataIndex: 'endTime',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.endTime - b.endTime,
            render: (endTime) => formatDate(endTime),
        },
        {
            title: 'Частота (в сутки)',
            dataIndex: '',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Кол-во показов',
            dataIndex: '',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Text>
                Показано устройств: 1 из 50
            </Text>

            <Table
                columns={columns}
                dataSource={adsData}
                onChange={onChange}
            />
        </>
    );
};

// AdsListPage.propTypes = {
//
// };

export default AdsListPage;
