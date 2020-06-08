import React, { useState } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import style from './style.module.scss';

const AntDropdown = ({
    children,
    items,
    icon: Icon,
    trigger,
    inlineStyle,
    ...rest
}) => {
    const {
        triggerContainerStyle = {},
        iconStyle = {},
        menuItemStyle = {},
    } = inlineStyle;
    const [state, setState] = useState(false);

    const renderMenu = (menuItems) => (
        <Menu>
            {menuItems.map((item, index) => (
                <Menu.Item key={`${item.href}_${index + 1}`}>
                    <Button
                        type="link"
                        href={item.href}
                        className={style.menuItem}
                        style={menuItemStyle}
                    >
                        {item.text}
                    </Button>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown
            overlay={() => renderMenu(items)}
            trigger={trigger}
            onVisibleChange={() => setState(!state)}
            {...rest}
        >
            <div className={style.trigger_container} style={triggerContainerStyle}>
                {children || <Button type="link">Show menu</Button>}
                {Icon
                    ? (
                        <Icon
                            className={style.icon}
                            style={{
                                ...iconStyle,
                                transform: state ? 'rotate(180deg)' : 'rotate(0)',
                            }}
                        />
                    )
                    : (
                        <DownOutlined
                            className={style.icon}
                            style={{
                                ...iconStyle,
                                transform: state ? 'rotate(180deg)' : 'rotate(0)',
                            }}
                        />
                    )}
            </div>
        </Dropdown>
    );
};

AntDropdown.propTypes = {
    children: PropTypes.element,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            text: PropTypes.string,
        }),
    ),
    icon: PropTypes.element,
    trigger: PropTypes.oneOf(['hover', 'click', 'contextMenu']),
    inlineStyle: PropTypes.shape({
        triggerContainerStyle: PropTypes.object,
        iconStyle: PropTypes.object,
        menuItemStyle: PropTypes.object,
    }),
};

AntDropdown.defaultProps = {
    children: null,
    items: [],
    icon: PropTypes.element,
    trigger: 'click',
    inlineStyle: {},
};

export default AntDropdown;
