// TODO(toleg): заменить s на style в импорте стилей
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Button } from 'antd';
import PropTypes from 'prop-types';

import { AvaLogo } from './_components/_assets';

import style from './style.module.scss';

const { Header, Content } = Layout;

const LoginLayout = ({ children }) => (
    <>
        <Helmet>
            <title>AVAStar - Login</title>
            <meta name="description" content="AVAStar - Login" />
        </Helmet>

        <Layout>
            <Header className={style.header}>
                <div className={style.header__container}>
                    <a href="/" className={style.header__logo}>
                        <AvaLogo />
                    </a>
                    <div className={style.header__buttons}>
                        <Button type="default" ghost>Регистрация</Button>
                        <Button type="primary">Вход</Button>
                    </div>
                </div>
            </Header>
            <Content className={style.content}>
                <div className={style.children_container}>
                    {children}
                </div>
            </Content>
        </Layout>
    </>
);

LoginLayout.propTypes = {
    children: PropTypes.element,
};

LoginLayout.defaultProps = {
    children: null,
};

export default LoginLayout;
