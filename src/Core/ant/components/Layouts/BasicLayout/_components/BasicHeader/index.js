import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import PropTypes from 'prop-types';

import { AntDropdown } from '@Core/ant/components';

import s from './style.module.scss';

const { Header } = Layout;

export const BasicHeader = ({
    siderState,
    setSiderState,
    dropdownItems,
    handleLogout,
    userName,
}) => (
    <Header className={s.header}>
        <div className={s.header__container}>
            {React.createElement(
                siderState.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: s.sider_trigger,
                    onClick: () => setSiderState(prevState => ({
                        ...prevState,
                        isCollapsed: !siderState.isCollapsed,
                    })),
                },
            )}
            <div className={s.header__container__dropdown}>
                <AntDropdown items={dropdownItems}>
                    <div className={s.dropdown_button}>
                        {userName}
                    </div>
                </AntDropdown>
                <Button
                    type="primary"
                    ghost
                    className={s.btn}
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
