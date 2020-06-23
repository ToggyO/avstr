import React from 'react';
// import PropTypes from 'prop-types';
import { Table } from 'antd';

import { onTableChange } from 'Core/ant';
import { getColumns } from './_components';

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

    return (
        <>
            {/* <Text> */}
            {/*    Показано устройств: 1 из 50 */}
            {/* </Text> */}

            <Table
                columns={getColumns()}
                bordered
                scroll={{ x: 1200, scrollToFirstRowOnChange: true }}
                dataSource={adsData}
                // loading={loading}
                // pagination={pagination}
                onChange={onTableChange}
                rowKey={(record) => record.creationTime}
            />
        </>
    );
};

// AdsListPage.propTypes = {
//
// };

export default AdsListPage;
