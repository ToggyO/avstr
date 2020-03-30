import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Dropdown, Icon } from 'semantic-ui-react';
import Logo from 'Core/common/Logo';

import { logout } from 'Core/authorization/action-creators';
import userManager from 'Core/authorization/userManager';

import Button from '../Button';

import styles from './index.module.scss';


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
                    type="outline"
                    size="small"
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
