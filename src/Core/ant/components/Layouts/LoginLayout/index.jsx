// TODO(nn): поправить обработчики, когда переработаем роутинг
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Button } from 'antd';
import PropTypes from 'prop-types';

import { AvaLogo } from './_components/_assets';

import styles from './index.module.scss';

const { Header, Content } = Layout;

const LoginLayout = ({ children }) => {
    const registerBtnHandler = () => {
        // временно пока не переработан роутинг
        window.location = '/advertiser-registration';
    };

    const entryBtnHandler = () => {
        // временно пока не переработан роутинг
        window.location = '/';
    };
    return (
        <>
            <Helmet>
                <title>AVAStar - Login</title>
                <meta name="description" content="AVAStar - Login" />
            </Helmet>

            <Layout>
                <Header className={styles.header}>
                    <div className={styles.header__container}>
                        <a href="/" className={styles.header__logo}>
                            <AvaLogo />
                        </a>
                        <div className={styles.header__buttons}>
                            <Button
                                type="default"
                                ghost
                                onClick={registerBtnHandler}
                            >
                                Регистрация
                            </Button>
                            <Button
                                type="primary"
                                onClick={entryBtnHandler}
                            >
                                Вход
                            </Button>
                        </div>
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

LoginLayout.propTypes = {
    children: PropTypes.element,
};

LoginLayout.defaultProps = {
    children: null,
};

export default LoginLayout;
