import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Button } from 'antd';

import { AvaLogo } from './_components/_assets';

import s from './style.module.scss';

const { Header, Content } = Layout;

const LoginLayout = ({ children }) => {
    return (
      <>
          <Helmet>
              <title>AVAStar - Login</title>
              <meta name="description" content="AVAStar - Login" />
          </Helmet>

          <Layout>
              <Header className={s.header}>
                  <div className={s.header__container}>
                      <a href="/" className={s.header__logo}>
                          <AvaLogo />
                      </a>
                      <div className={s.header__buttons}>
                          <Button type="default" ghost>Регистрация</Button>
                          <Button type="primary">Вход</Button>
                      </div>
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

export default LoginLayout;

