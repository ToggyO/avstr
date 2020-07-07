import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import { checkRoles } from 'Core/utils/checkRoles';

import styles from './index.module.scss';

const AntDropdown = ({
    children,
    items,
    icon: Icon,
    trigger,
    inlineStyle,
    roles,
    ...rest
}) => {
    const {
        triggerContainerStyle = {},
        iconStyle = {},
        menuItemStyle = {},
    } = inlineStyle;
    const [isVisible, setVisible] = useState(false);

    const renderMenu = (menuItems) => (
        <Menu>
            {menuItems.map((item, index) => (
                checkRoles(item.allowedRoles || [], roles)
                    ? (
                        <Menu.Item key={`${item.href}_${index + 1}`} onClick={() => setVisible(!isVisible)}>
                            <Link
                                to={item.href}
                                className={styles.menuItem}
                                style={menuItemStyle}
                            >
                                {item.text}
                            </Link>
                        </Menu.Item>
                    ) : null
            ))}
        </Menu>
    );

    return (
        <Dropdown
            overlay={() => renderMenu(items)}
            trigger={trigger}
            visible={isVisible}
            onVisibleChange={() => setVisible(!isVisible)}
            {...rest}
        >
            <div className={styles.triggerContainer} style={triggerContainerStyle}>
                {children || <Button type="link">Show menu</Button>}
                {Icon
                    ? (
                        <Icon
                            className={styles.icon}
                            style={{
                                ...iconStyle,
                                transform: isVisible ? 'rotate(180deg)' : 'rotate(0)',
                            }}
                        />
                    )
                    : (
                        <DownOutlined
                            className={styles.icon}
                            style={{
                                ...iconStyle,
                                transform: isVisible ? 'rotate(180deg)' : 'rotate(0)',
                            }}
                        />
                    )}
            </div>
        </Dropdown>
    );
};

AntDropdown.propTypes = {
    children: PropTypes.node,
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
    roles: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOf([[], 'Administrator', 'DeviceManager', 'Advertiser']),
        ),
        PropTypes.string,
    ]),
};

AntDropdown.defaultProps = {
    children: null,
    items: [],
    icon: null,
    trigger: 'click',
    inlineStyle: {},
    roles: [],
};

export default AntDropdown;
