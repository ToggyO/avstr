import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'beautiful-react-hooks';

import userManager from 'Core/authorization/utils/userManager';
import { BREAKPOINTS } from 'Core/ant/constants';
import { getFromLocalState } from 'Core/utils/local-storage';
import { logout } from 'Core/authorization/action-creators';
import { ROOT_ROUTES } from 'Core/constants';
import { BasicHeader, BasicSider } from './_components';
import { getPageTitle } from '../../../helpers';

import styles from './index.module.scss';

const { Content } = Layout;

const BasicLayout = ({ children, location, logoutAction }) => {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.LG}px)`);

    const [siderState, setSiderState] = useState({
        isCollapsed: isMobile,
        isFixed: isMobile,
    });

    useEffect(() => {
        setSiderState((prevState) => ({
            ...prevState,
            isCollapsed: isMobile,
            isFixed: isMobile,
        }));
    }, [isMobile]);

    const { pathname } = location;

    const title = getPageTitle({
        pathname,
    });

    const dropdownItems = [
        {
            href: ROOT_ROUTES.ADVERTISER,
            text: 'Кабинет рекламодателя',
        },
        {
            href: ROOT_ROUTES.AD_MANAGER,
            text: 'Управление рекламой',
        },
        {
            href: `${ROOT_ROUTES.DEVICES}/main/list`,
            text: 'Управление устройствами',
        },
    ];

    const userName = getFromLocalState('userName');

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
                <BasicSider siderState={siderState} setSiderState={setSiderState} />
                <Layout>
                    <BasicHeader
                        siderState={siderState}
                        setSiderState={setSiderState}
                        dropdownItems={dropdownItems}
                        handleLogout={handleLogout}
                        userName={userName}
                    />
                    <Content className={styles.content}>
                        <div className={styles.childrenContainer}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

BasicLayout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
    logoutAction: PropTypes.func,
};

BasicLayout.defaultProps = {
    children: null,
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
