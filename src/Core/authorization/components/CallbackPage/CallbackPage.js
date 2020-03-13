import React, { Component } from 'react';

import Loader from '../../../common/Loader/Loader';
import userManager from '../../userManager';

import history from '../../../history';


class CallbackPage extends Component {
    componentDidMount() {
        userManager
            .signinRedirectCallback()
            .then((user) => this.successCallback(user))
            .catch((error) => this.errorCallback(error));
    }

    successCallback = ({ state: { path: { path } } }) => {
        history.push('/advertiser');
    };

    errorCallback = (error) => {
        history.push('/');
    };

    render() {
        return (
            <Loader />
        );
    }
}

export default CallbackPage;
