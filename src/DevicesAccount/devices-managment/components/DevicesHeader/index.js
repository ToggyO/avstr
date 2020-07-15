import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Container from 'Core/common/Container';
import { Typography, Button, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title } = Typography;

const DevicesHeader = ({
    text,
    handleListBtn,
    handleMapBtn,
    handleAddBtn,
    location,
}) => {
    const splittedPathname = location.pathname.split('/');
    const radioGroupDefaultValue = splittedPathname[splittedPathname.length - 1];
    const [defaultValue, setDefaultValue] = useState(radioGroupDefaultValue);

    useEffect(() => {
        setDefaultValue(splittedPathname[splittedPathname.length - 1]);
    }, [location.pathname]);

    const handleRadioChange = ({ target: { value } }) => {
        switch (value) {
            case 'list':
                handleListBtn();
                break;
            case 'map':
                handleMapBtn();
                break;
            default:
                break;
        }
    };

    return (
        <Container>
            <div className={styles.wrap}>
                <Title className={styles.title}>{text}</Title>
                <Radio.Group
                    defaultValue={defaultValue}
                    value={defaultValue}
                    buttonStyle="solid"
                    size="large"
                    onChange={handleRadioChange}
                    className={styles.radioGroup}
                >
                    <Radio.Button
                        value="list"
                        className={styles.radio}
                    >
                        Списком
                    </Radio.Button>
                    <Radio.Button
                        value="map"
                        className={styles.radio}
                    >
                        На карте
                    </Radio.Button>
                </Radio.Group>

                <Button
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                    className={styles.btn}
                    onClick={handleAddBtn}
                >
                    Добавить
                </Button>
            </div>
        </Container>
    );
};

DevicesHeader.defaultProps = {
    text: '',
};

DevicesHeader.propTypes = {
    text: PropTypes.string,
    handleAddBtn: PropTypes.func.isRequired,
    handleMapBtn: PropTypes.func.isRequired,
    handleListBtn: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DevicesHeader;
