// TODO(toleg): разобраться с prop-types для errorsFromBackend после создания механизма обработки ошибок с бэка
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Layout, message } from 'antd';
import PropTypes from 'prop-types';

import { getProp } from 'Core/utils/getProp';
import { isEmptyObject } from 'Core/utils/isEmpty';
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
        if (isShown) {
            if ((typeof errorsFromBackend === 'object' && !isEmptyObject(errorsFromBackend))
            ) {
                message.error('Что-то пошло не так. Повторите попытку ', 5);
            }
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
                    <div className={styles.childrenContainer}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </>
    );
};

AccessRecoveryLayout.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
};

AccessRecoveryLayout.defaultProps = {
    children: null,
    loading: false,
    errorsFromBackend: {},
};

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
    errorsFromBackend: getProp(accessRecoveryReducer, 'errors', []),
});

export default connect(mapStateToProps)(AccessRecoveryLayout);
