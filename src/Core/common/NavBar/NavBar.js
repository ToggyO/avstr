import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Button } from 'semantic-ui-react';

import styles from './NavBar.module.scss';
import Logo from '../../authorization/components/Logo/Logo';

const NavBar = ({ handleLogoutClick }) => {
    const trigger = (
        <span>
            <Icon name="user" />
            mris@avastar.ru
        </span>
    );
    return (
        <nav className={styles.navbar}>
            <Logo />
            <div>
                <Dropdown
                    trigger={trigger}
                    simple
                    item
                />
                <Button
                    className={styles.btn}
                    onClick={handleLogoutClick}
                >
                    Выйти
                </Button>
            </div>
        </nav>
    );
};


NavBar.propTypes = {
    handleLogoutClick: PropTypes.func.isRequired,
};

export default NavBar;
