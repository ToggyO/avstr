import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import PropTypes from 'prop-types';

import AntDropdown from 'Core/ant/components/Dropdown';

import styles from './index.module.scss';

const { Header } = Layout;

const BasicHeader = ({
    siderState,
    setSiderState,
    dropdownItems,
    handleLogout,
    userName,
}) => (
    <Header className={styles.header}>
        <div className={styles.header__container}>
            {React.createElement(
                siderState.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: styles.siderTrigger,
                    onClick: () => setSiderState((prevState) => ({
                        ...prevState,
                        isCollapsed: !siderState.isCollapsed,
                    })),
                },
            )}
            <div className={styles.header__container__dropdown}>
                <AntDropdown items={dropdownItems}>
                    <div className={styles.dropdownButton}>
                        {userName}
                    </div>
                </AntDropdown>
                <Button
                    type="primary"
                    ghost
                    className={styles.btn}
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </div>
        </div>
    </Header>
);

BasicHeader.propTypes = {
    siderState: PropTypes.shape({
        isCollapsed: PropTypes.bool,
        isFixed: PropTypes.bool,
    }),
    setSiderState: PropTypes.func,
    dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ),
    handleLogout: PropTypes.func,
    userName: PropTypes.string,
};

BasicHeader.defaultProps = {
    siderState: {},
    setSiderState: Function.prototype,
    dropdownItems: [],
    handleLogout: Function.prototype,
    userName: '',
};

export default BasicHeader;
