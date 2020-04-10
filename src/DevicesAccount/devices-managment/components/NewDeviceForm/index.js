import React from 'react';
import PropTypes from 'prop-types';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import Button from 'Core/common/Button';
import Popup from 'Core/common/Popup';
import { Icon } from 'semantic-ui-react';
import NewDeviceTextItem from '../NewDeviceTextItem';

import styles from './index.module.scss';

const NewDeviceForm = ({
    deviceStatus,
    code,
    deviceName,
    handleCodeChange,
    handleDeviceNameChange,
    handleDeclineBtn,
    okBtnHandler,
    handleClosePopup,
    popupOkBtnHandler,
}) => (
    <>
        <Container className={styles.newDevice}>
            <Title
                text="Новое устройство"
                className={styles.title}
            />
            <NewDeviceTextItem
                number={1}
                text="Включите устройство"
                className={styles.firstPoint}
            />

            <NewDeviceTextItem
                number={2}
                text="Введите код с экрана устройства"
                className={styles.otherPoints}
            />
            <Input
                className={styles.firstInput}
                value={code}
                onChange={handleCodeChange}
            />

            <NewDeviceTextItem
                number={3}
                text="Придумайте название"
                className={styles.otherPoints}
            />
            <Input
                placeholder="Устройство 1"
                className={styles.secondInput}
                value={deviceName}
                onChange={handleDeviceNameChange}
            />

            <div className={styles.btnsWrap}>
                <Button
                    type="outline"
                    size="medium"
                    className={styles.declineBtn}
                    onClick={handleDeclineBtn}
                >
                    Отменить
                </Button>

                <Button
                    type="main"
                    size="medium"
                    disabled={!code || !deviceName}
                    className={styles.okBtn}
                    onClick={okBtnHandler}
                >
                    Далее
                    <Icon name="arrow circle right" />
                </Button>
                {deviceStatus === 'pending'
                && (
                    <div className={styles.status}>
                        Подождите, ожидается подключение устройства.
                    </div>
                )}
            </div>
            <div>{deviceStatus}</div>
        </Container>

        <Popup
            show={deviceStatus === 'notConnected' || deviceStatus === 'popupPending'}
            modalClassName={styles.modal}
            onOverlayClick={handleClosePopup}
        >
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
                    <Icon name="arrow circle right" />
                </Button>
                {deviceStatus === 'popupPending'
                && (
                    <div className={styles.status}>
                        Подождите, ожидается подключение устройства.
                    </div>
                )}
            </div>
        </Popup>
    </>
);

NewDeviceForm.propTypes = {
    deviceStatus: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    deviceName: PropTypes.string.isRequired,
    handleCodeChange: PropTypes.func.isRequired,
    handleDeviceNameChange: PropTypes.func.isRequired,
    handleDeclineBtn: PropTypes.func.isRequired,
    okBtnHandler: PropTypes.func.isRequired,
    handleClosePopup: PropTypes.func.isRequired,
    popupOkBtnHandler: PropTypes.func.isRequired,
};

export default NewDeviceForm;
