import React from 'react';
import { Badge, Popover } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import PropTypes from 'prop-types';

import { BREAKPOINTS } from '../../constants';

import styles from './index.module.scss';

const Text = ({ desc, style }) => <p className={styles.popoverTitle} style={style}>{desc}</p>;

Text.propTypes = {
    desc: PropTypes.string,
    style: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
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

const PasswordValidationRulesPopover = ({ visible }) => {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.LG}px)`);

    return (
        <Popover
            visible={visible}
            content={RenderValidationStatus}
            title={<p className={styles.popoverTitle}>Надежный пароль</p>}
            trigger="hover"
            placement={isMobile ? 'top' : 'right'}
            overlayStyle={{
                marginLeft: isMobile ? 24 : 0,
                marginRight: isMobile ? 24 : 0,
            }}
        >
            <div />
        </Popover>
    );
};

PasswordValidationRulesPopover.propTypes = {
    visible: PropTypes.bool,
};

PasswordValidationRulesPopover.defaultProps = {
    visible: false,
};

export default PasswordValidationRulesPopover;
