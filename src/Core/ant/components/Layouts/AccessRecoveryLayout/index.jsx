import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Layout, message } from 'antd';
import PropTypes from 'prop-types';

import { getProp } from 'Core/utils/getProp';
import { AvaLogo } from '../LoginLayout/_components/_assets';

import styles from './index.module.scss';

const { Header, Content } = Layout;

const AccessRecoveryLayout = ({ children, loading, errorsFromBackend }) => {
    useEffect(() => {
        let isShown = true;
        if (isShown && loading) {
            message.loading('Дождитесь завершения операции', 0);
        } else {
            message.destroy();
        }
        return () => {
            isShown = false;
        };
    }, [loading]);

    useEffect(() => {
        let isShown = true;
        if (isShown && errorsFromBackend.length) {
            message.error('Что-то пошло не так. Повторите попытку ', 5000);
        }
        return () => {
            isShown = false;
        };
    }, [errorsFromBackend]);

    return (
        <>
            <Helmet>
                <title>AVAStar - Recovery</title>
                <meta name="description" content="AVAStar - Recovery" />
            </Helmet>

            <Layout>
                <Header className={styles.header}>
                    <div className={styles.header__container}>
                        <a href="/" className={styles.header__logo}>
                            <AvaLogo />
                        </a>
                    </div>
                </Header>
                <Content className={styles.content}>
                    <div className={styles.children_container}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </>
    );
};

AccessRecoveryLayout.propTypes = {
    children: PropTypes.element,
    loading: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    errorsFromBackend: PropTypes.array,
};

AccessRecoveryLayout.defaultProps = {
    children: null,
    loading: false,
    errorsFromBackend: [],
};

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
    errorsFromBackend: getProp(accessRecoveryReducer, 'errors', []),
});

export default connect(mapStateToProps)(AccessRecoveryLayout);
