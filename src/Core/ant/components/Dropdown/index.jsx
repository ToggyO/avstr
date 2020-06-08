// TODO(toleg): заменить s на style в импорте стилей
import React, { useState } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import s from './style.module.scss';

export const AntDropdown = ({
    children,
    items = [],
    icon: Icon,
    trigger = 'click',
    style = {},
    ...rest
}) => {
    const {
        triggerContainerStyle = {},
        iconStyle = {},
        menuItemStyle = {}
    } = style;
    const [state, setState] = useState(false);

    const renderMenu = menuItems => (
        <Menu>
            {menuItems.map((item, index) => (
                <Menu.Item key={`${item.href}_${index + 1}`}>
                    <Button
                        type="link"
                        href={item.href}
                        className={s.menuItem}
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
            <div className={s.trigger_container} style={triggerContainerStyle}>
                {children ? children : <Button type="link">Show menu</Button>}
                {Icon
                    ? <Icon
                        className={s.icon}
                        style={{
                            ...iconStyle,
                            transform: state ? 'rotate(180deg)' : 'rotate(0)'
                        }}
                      />
                    : <DownOutlined
                        className={s.icon}
                        style={{
                            ...iconStyle,
                            transform: state ? 'rotate(180deg)' : 'rotate(0)'
                        }}
                      />
                }
            </div>
        </Dropdown>
    );
};

AntDropdown.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
          href: PropTypes.string,
          text: PropTypes.string,
      }),
    ),
    icon: PropTypes.element,
    trigger: PropTypes.oneOf(['hover', 'click', 'contextMenu']),
    style: PropTypes.shape({
        triggerContainerStyle: PropTypes.object,
        iconStyle: PropTypes.object,
        menuItemStyle: PropTypes.object,
    }),
};
