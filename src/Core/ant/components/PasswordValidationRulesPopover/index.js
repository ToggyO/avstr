import React from 'react';
import { Badge, Popover } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Text = ({ desc, style }) => <p className={styles.popoverTitle} style={style}>{desc}</p>;

Text.propTypes = {
    desc: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.any),
};

Text.defaultProps = {
    desc: '',
    style: {},
};

const RenderValidationStatus = () => (
    <div className={styles.helpContainer}>
        <Badge
            status="default"
            text={<Text desc="8 и более символов" />}
            className={styles.popoverBadge}
        />
        <Badge
            status="default"
            text={<Text desc="прописные латинские буквы от A до Z" />}
            className={styles.popoverBadge}
        />
        <Badge
            status="default"
            text={<Text desc="строчные латинские буквы от a до z" />}
            className={styles.popoverBadge}
        />
        <Badge
            status="default"
            text={<Text desc="цифры от 0 до 9" />}
            className={styles.popoverBadge}
        />
        <Badge
            status="default"
            text={(
                <Text
                    desc={'знаки пунктуации ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` {|} ~'}
                />
            )}
            className={styles.popoverBadge}
        />
    </div>
);

const PasswordValidationRulesPopover = ({ visible, isMobile }) => (
    <Popover
        visible={visible}
        content={RenderValidationStatus}
        title={<p className={styles.popoverTitle}>Требования для безопасного пароля</p>}
        placement={isMobile ? 'top' : 'right'}
        autoAdjustOverflow={false}
        destroyTooltipOnHide
        overlayStyle={{
            marginLeft: isMobile ? 24 : 0,
            marginRight: isMobile ? 24 : 0,
        }}
    >
        <div />
    </Popover>
);

PasswordValidationRulesPopover.propTypes = {
    visible: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default PasswordValidationRulesPopover;
