import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import history from 'Core/history';

import { Icon } from 'semantic-ui-react';
import Loader from 'Core/common/Loader';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';

import styles from './components/Devices/index.module.scss';

const DevicesListPage = lazy(() => import('./containers/DevicesListPage'));
const DevicesMapPage = lazy(() => import('./containers/DevicesMapPage'));

const DevicesPageRouter = ({ match: { path } }) => {
    const handleAddBtn = () => {
        history.push('/devices/add');
    };

    const handleMapBtn = () => {
        history.push('/devices/main/map');
    };

    const handleListBtn = () => {
        history.push('/devices/main/list');
    };

    return (
        <>
            <Container>
                <div className={styles.wrap}>
                    <Title
                        className={styles.title}
                        // text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
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
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route
                        path={`${path}/list`}
                        component={DevicesListPage}
                    />
                    <Route
                        path={`${path}/map`}
                        component={DevicesMapPage}
                    />
                </Switch>
            </Suspense>
        </>
    );
};


DevicesPageRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default DevicesPageRouter;
