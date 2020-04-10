import React from 'react';
import PropTypes from 'prop-types';

import { Icon as SemanticIcon } from 'semantic-ui-react';
import Popup from 'Core/common/Popup';
import Button from 'Core/common/Button';
import Icon from 'Core/common/Icon';

import styles from './index.module.scss';

const NewDeviceErrPopup = ({
    show,
    deviceStatus,
    handleClosePopup,
    handleDeclineBtn,
    popupOkBtnHandler,
}) => (
    <Popup
        show={show}
        modalClassName={styles.modal}
        onOverlayClick={handleClosePopup}
    >
        <Icon
            name="closeCross"
            className={styles.closeIcon}
            onClick={handleClosePopup}
        />
        <div className={styles.modalTitle}>Ошибка регистрации устройства</div>
        <ol className={styles.modalList}>
            <li>Проверьте, включено ли устройство.</li>
            <li>Повторите попытку регистрации.</li>
        </ol>
        <div>
            <Button
                type="outline"
                size="medium"
                className={styles.declineModalBtn}
                onClick={handleDeclineBtn}
            >
                Отменить
            </Button>
            <Button
                type="main"
                size="medium"
                className={styles.okModalBtn}
                onClick={popupOkBtnHandler}
            >
                Повторить
                <SemanticIcon name="arrow circle right" />
            </Button>
            {deviceStatus === 'popupPending'
            && (
                <div className={styles.status}>
                    Подождите, ожидается подключение устройства.
                </div>
            )}
        </div>
    </Popup>
);


NewDeviceErrPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    deviceStatus: PropTypes.string.isRequired,
    handleClosePopup: PropTypes.func.isRequired,
    handleDeclineBtn: PropTypes.func.isRequired,
    popupOkBtnHandler: PropTypes.func.isRequired,
};

export default NewDeviceErrPopup;
