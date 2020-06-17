import React from 'react';
// import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';

// import styles from './index.module.scss';

const { Text } = Typography;

const AdsListPage = () => {
    const adsData = [
        {
            id: '1',
            name: 'John Brown',
            creationTime: '2020-06-17T12:08:07.418Z',
            state: 0,
        },
        {
            id: '2',
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
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '',
            dataIndex: 'image',
        },
        {
            title: 'Название',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Статус',
            dataIndex: 'state',
            filters: [
                {
                    text: 'Активно',
                    value: 0,
                },
                {
                    text: 'Ожидает показа',
                    value: 1,
                },
                {
                    text: 'Приостановлено',
                    value: 2,
                },
                {
                    text: 'Завершено',
                    value: 3,
                },
            ],
            onFilter: (value, record) => record.state === value,
        },
        {
            title: 'Начало',
            dataIndex: '',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Окончание',
            dataIndex: '',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
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

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

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
