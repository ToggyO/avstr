import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Dropdown, Icon, Button } from 'semantic-ui-react';
import Logo from '../../authorization/components/Logo/Logo';

import { logout } from '../../authorization/action-creators';
import userManager from '../../authorization/userManager';

import styles from './NavBar.module.scss';


const NavBar = ({ logoutAction }) => {
    const handleLogout = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
        logoutAction();
    };

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
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </div>
        </nav>
    );
};


NavBar.propTypes = {
    logoutAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default connect(null, mapDispatchToProps)(NavBar);
