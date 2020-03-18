import React, { Component } from 'react';

import history from 'Core/history';

import Loader from 'Core/common/Loader';
import userManager from 'Core/authorization/userManager';


class CallbackPage extends Component {
    componentDidMount() {
        userManager
            .signinRedirectCallback()
            .then((user) => this.successCallback(user))
            .catch((error) => this.errorCallback(error));
    }

    successCallback = () => {
        const redirectPath = localStorage.getItem('redirectPath');
        history.push(redirectPath);
    };

    errorCallback = () => {
        history.push('/');
    };

    render() {
        return (
            <Loader />
        );
    }
}

export default CallbackPage;
