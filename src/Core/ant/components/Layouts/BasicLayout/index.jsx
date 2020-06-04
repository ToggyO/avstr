import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'beautiful-react-hooks';

import { BasicHeader, BasicSider } from './_components';
import { getPageTitle, getHeaderTitle } from '@Core/ant/helpers';
import userManager from '@Core/authorization/utils/userManager';
import { logout } from '@Core/authorization/action-creators';
import { BREAKPOINTS } from '@Core/ant/constants';

import s from './style.module.scss';

const { Content } = Layout;

const BasicLayout = ({ children, location, logoutAction }) => {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.LG}px)`);

    const [siderState, setSiderState] = useState({
        isCollapsed: true,
        isFixed: isMobile,
    });

    useEffect(() => {
        setSiderState(prevState => ({
            ...prevState,
            isFixed: isMobile,
        }));
    }, [isMobile]);

    const { pathname } = location;

    const title = getPageTitle({
        pathname,
    });

    const dropdownItems = [
        {
            href: '/advertiser',
            text: 'Рекламодатель',
        },
        {
            href: '/devices/main/list',
            text: 'Администрирование',
        },
    ];

    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
        logoutAction();
    };

    return (
        <>
            <Helmet>
                <title>{`AVAStar${title}`}</title>
                <meta name="description" content={`AVAStar${title}`} />
            </Helmet>

            <Layout>
                <BasicSider siderState={siderState} setSiderState={setSiderState}/>
                <Layout>
                    <BasicHeader
                        siderState={siderState}
                        setSiderState={setSiderState}
                        dropdownItems={dropdownItems}
                        handleLogout={handleLogout}
                        userName={userName}
                    />
                    <Content className={s.content}>
                        <div className={s.children_container}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

BasicLayout.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
    logoutAction: PropTypes.func,
};

BasicLayout.defaultProps = {
    location: {
        pathname: '/',
    },
    logoutAction: Function.prototype,
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
)(BasicLayout);
