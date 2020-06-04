import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';

import { AvaLogo } from '../LoginLayout/_components/_assets';

import s from './style.module.scss';

const { Header, Content } = Layout;

const AccessRecoveryLayout = ({ children }) => {
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

export default AccessRecoveryLayout;
