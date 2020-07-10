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

const LoginLayout = ({ children, location, setDefaultStateAction }) => {
    const { search } = location;

    const registerBtnHandler = () => {
        setDefaultStateAction();
        history.push(ROOT_ROUTES.AD_REGISTRATION);
    };

    const entryBtnHandler = () => {
        history.push(`/${search || ''}`);
    };

    const { pathname } = location;
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
                            {
                                pathname === '/'
                                    ? (
                                        <Button
                                            type="default"
                                            ghost
                                            onClick={registerBtnHandler}
                                        >
                                            Регистрация
                                        </Button>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={entryBtnHandler}
                                        >
                                            Вход
                                        </Button>
                                    )
                            }
                        </div>
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

LoginLayout.defaultProps = {
    children: null,
    setDefaultStateAction: Function.prototype,
};

LoginLayout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string,
    }).isRequired,
    setDefaultStateAction: PropTypes.func,
};

export default withRouter(LoginLayout);
