import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Layout, Button } from 'antd';
import PropTypes from 'prop-types';

import history from 'Core/history';
import { ROOT_ROUTES } from 'Core/constants';
import { AvaLogo } from './_components/_assets';

import styles from './index.module.scss';

const { Header, Content } = Layout;

const LoginLayout = ({ children, location }) => {
    const { search } = location;

    const registerBtnHandler = () => {
        history.push(ROOT_ROUTES.AD_REGISTRATION);
    };

    const entryBtnHandler = () => {
        history.push(`/${search || ''}`);
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
    location: PropTypes.shape({
        search: PropTypes.string,
        [PropTypes.string]: PropTypes.any,
    }).isRequired,
};

LoginLayout.defaultProps = {
    children: null,
};

export default withRouter(LoginLayout);
