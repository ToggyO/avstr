import React from 'react';
import PropTypes from 'prop-types';

import Popup from 'Core/common/Popup';
import Button from 'Core/common/Button';
import Icon from 'Core/common/Icon';

import styles from './index.module.scss';

const NewDeviceWarnPopup = ({
    show,
    noBtnHandler,
    yesBtnHandler,
}) => (
    <Popup
        show={show}
        modalClassName={styles.modal}
        onOverlayClick={noBtnHandler}
    >
        <Icon
            name="closeCross"
            className={styles.closeIcon}
            onClick={noBtnHandler}
        />
        <div className={styles.modalTitle}>Покинуть страницу?</div>
        <div className={styles.modalText}>Все несохраненные данные будут потеряны.</div>
        <div>
            <Button
                type="outline"
                className={styles.declineModalBtn}
                onClick={noBtnHandler}
            >
                Нет
            </Button>
            <Button
                className={styles.okModalBtn}
                onClick={yesBtnHandler}
            >
                Да
            </Button>
        </div>
    </Popup>
);

NewDeviceWarnPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    noBtnHandler: PropTypes.func.isRequired,
    yesBtnHandler: PropTypes.func.isRequired,
};

export default NewDeviceWarnPopup;
