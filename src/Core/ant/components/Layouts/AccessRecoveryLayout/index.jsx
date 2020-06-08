// TODO(toleg): заменить s на style в импорте стилей, добавить prop-types
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Layout, message } from 'antd';

import { getProp } from '@Core/utils/getProp';
import { AvaLogo } from '../LoginLayout/_components/_assets';

import s from './style.module.scss';

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
                <Header className={s.header}>
                    <div className={s.header__container}>
                        <a href="/" className={s.header__logo}>
                            <AvaLogo />
                        </a>
                    </div>
                </Header>
                <Content className={s.content}>
                    <div className={s.children_container}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </>
    );
};

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
    errorsFromBackend: getProp(accessRecoveryReducer, 'errors', []),
});

export default connect(mapStateToProps)(AccessRecoveryLayout);
