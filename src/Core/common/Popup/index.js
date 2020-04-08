import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';


const Popup = ({
    show,
    children,
    overlayClassName,
    modalClassName,
    onOverlayClick,
}) => {
    const modalRoot = document.querySelector('#modal');

    const modalClasses = cn(modalClassName, styles.modal);
    let overlayClasses = cn(overlayClassName, styles.overlay);

    if (show) {
        overlayClasses = cn(overlayClasses, styles.open);
    }

    const handleOverlayClick = (e) => {
        if (!e.target.classList.contains(`${styles.overlay}`)) return;
        onOverlayClick();
    };
    return (show
        && ReactDOM.createPortal(
            <div
                className={overlayClasses}
                onClick={handleOverlayClick}
                role="presentation"
            >
                <div className={modalClasses}>
                    {children}
                </div>
            </div>,
            modalRoot,
        ));
};


Popup.defaultProps = {
    show: false,
    children: '',
    overlayClassName: '',
    modalClassName: '',
    onOverlayClick: () => {},
};

Popup.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node,
    overlayClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    onOverlayClick: PropTypes.func,
    parent: PropTypes.string.isRequired,
};

export default Popup;
