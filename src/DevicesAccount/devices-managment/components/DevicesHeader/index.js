import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'semantic-ui-react';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';

import styles from './index.module.scss';

const DevicesHeader = ({
    text,
    handleListBtn,
    handleMapBtn,
    handleAddBtn,
}) => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text={text}
            />
            <div>
                <Button
                    type="outline"
                    className={styles.btn}
                    onClick={handleListBtn}
                >
                    Списком
                </Button>
                <Button
                    type="outline"
                    className={styles.btn}
                    onClick={handleMapBtn}
                >
                    На карте
                </Button>
            </div>

            <Button
                type="main"
                withIcon
                className={styles.btn}
                onClick={handleAddBtn}
            >
                <Icon name="plus" />
                Добавить
            </Button>
        </div>
    </Container>
);


DevicesHeader.defaultProps = {
    text: '',
};

DevicesHeader.propTypes = {
    text: PropTypes.string,
    handleAddBtn: PropTypes.func.isRequired,
    handleMapBtn: PropTypes.func.isRequired,
    handleListBtn: PropTypes.func.isRequired,
};

export default DevicesHeader;
