import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import userManager from 'Core/authorization/userManager';
import api from 'Core/api';

import Loader from 'Core/common/Loader';
import NavBar from 'Core/common/NavBar';

const AdvertiserAccountPage = lazy(() => import('./AdvertiserAccountPage'));
const NewAdvertisementPage = lazy(() => import('./advertising-management/NewAdvertisementPage'));


class AdvertiserAccountRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        userManager.getUser().then((user) => {
            if (!user || user.expired) {
                userManager.signinRedirect({
                    data: { path: '' },
                });
            } else {
                this.setState({
                    isLoggedIn: true,
                });
                api.setConstantHeader('Authorization', `Bearer ${user.access_token}`);
            }
        });
    }

    render() {
        const { match: { path } } = this.props;
        const { isLoggedIn } = this.state;
        return (
            <div>
                {isLoggedIn
                    ? (
                        <div>
                            <NavBar />
                            <Suspense fallback={<Loader />}>
                                <Switch>
                                    <Route
                                        exact
                                        path={`${path}`}
                                        component={AdvertiserAccountPage}
                                    />
                                    <Route
                                        path={`${path}/add`}
                                        component={NewAdvertisementPage}
                                    />
                                </Switch>
                            </Suspense>
                        </div>
                    )
                    : <Loader />}
            </div>
        );
    }
}


AdvertiserAccountRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserAccountRouter;
