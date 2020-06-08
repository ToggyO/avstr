import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFromLocalState } from 'Core/utils/ls';
import { logout } from 'Core/authorization/action-creators';
import userManager from 'Core/authorization/utils/userManager';

import { NavLink } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import Logo from 'Core/common/Logo';
import Button from '../Button';

import styles from './index.module.scss';


const NavBar = ({ logoutAction }) => {
    const handleLogout = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
        logoutAction();
    };

    const userName = getFromLocalState('userName');

    return (
        <nav className={styles.navbar}>
            <div className={styles.wrap}>
                <Logo />
                <div>
                    <Dropdown text={userName}>
                        <Dropdown.Menu className={styles.menu}>
                            <NavLink
                                to="/advertiser"
                                activeClassName={styles.itemActive}
                            >
                                <Dropdown.Item
                                    text="Рекламодатель"
                                    className={styles.item}
                                />
                            </NavLink>
                            <NavLink
                                to="/devices/main/list"
                            >
                                <Dropdown.Item
                                    text="Администрирование"
                                    className={styles.item}
                                />
                            </NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        type="outline"
                        size="small"
                        className={styles.btn}
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
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
