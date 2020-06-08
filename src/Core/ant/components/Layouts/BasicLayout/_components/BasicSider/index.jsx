// TODO(toleg): заменить s на style в импорте стилей
import React from 'react';
import { Menu, Layout } from 'antd';
import PropTypes from 'prop-types';
import { useGlobalEvent } from 'beautiful-react-hooks';

import { AnimationWrapper } from '@Core/common/AnimationWrapper';
import { AvaSystemsLogo } from '../_assets';

import s from './style.module.scss';

const { Sider } = Layout;

export const BasicSider = ({
    siderState,
    setSiderState,
}) => {
    const { isCollapsed, isFixed } = siderState;
    const targetClass = 'sider-link';

    function collapseSiderByClick(e) {
        const { classList } = e.target;
        if (isFixed && classList.contains(targetClass)) {
            setSiderState(prevState => ({
                ...prevState,
                isCollapsed: true,
            }));
        }
    }

    const onWindowClick = useGlobalEvent('click');
    onWindowClick(e => collapseSiderByClick(e));

    return (
        <>
            <AnimationWrapper
                show={!isCollapsed && isFixed}
                showAnimName="fadeIn"
                hideAnimName="fadeOut"
                restAnimationProps={{ duration: '0.5s' }}
            >
                <div className={`${s.sider__overlay} ${targetClass}`} />
            </AnimationWrapper>

            <Sider
                className={s.sider}
                theme="light"
                collapsedWidth={0}
                collapsed={isCollapsed}
                style={{
                    position: isFixed ? 'fixed' : 'static',
                    height: isFixed ? '100vh' : '',
                    zIndex: 10,
                }}
            >
                <div className={s.sider__logo}>
                    <AvaSystemsLogo />
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    {/* FIXME: temporary solution */}
                    <Menu.Item key="1">
                        <div className={targetClass}>
                            nav 1
                        </div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div className={targetClass}>
                            nav 2
                        </div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div className={targetClass}>
                            nav 3
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
};

BasicSider.propTypes = {
    siderState: PropTypes.shape({
        isCollapsed: PropTypes.bool,
        isFixed: PropTypes.bool,
    }),
    setSiderState: PropTypes.func,
};

BasicSider.defaultProps = {
    siderState: {},
    setSiderState: Function.prototype,
};
