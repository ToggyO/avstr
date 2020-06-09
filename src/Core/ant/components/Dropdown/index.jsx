import React, { useState } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

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
                        className={styles.menuItem}
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
            <div className={styles.trigger_container} style={triggerContainerStyle}>
                {children || <Button type="link">Show menu</Button>}
                {Icon
                    ? (
                        <Icon
                            className={styles.icon}
                            style={{
                                ...iconStyle,
                                transform: state ? 'rotate(180deg)' : 'rotate(0)',
                            }}
                        />
                    )
                    : (
                        <DownOutlined
                            className={styles.icon}
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
    icon: null,
    trigger: 'click',
    inlineStyle: {},
};

export default AntDropdown;
