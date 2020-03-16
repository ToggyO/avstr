import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Button } from 'semantic-ui-react';

import styles from './NavBar.module.scss';

const NavBar = ({ handleLogoutClick }) => {
    const trigger = (
        <span>
            <Icon name="user" />
            mris@avastar.ru
        </span>
    );
    return (
        <nav className={styles.navbar}>
            <Dropdown
                trigger={trigger}
                simple
                item
            />
            <Button onClick={handleLogoutClick}>
                Выйти
            </Button>
        </nav>
    );
};


NavBar.propTypes = {
    handleLogoutClick: PropTypes.func.isRequired,
};

export default NavBar;
