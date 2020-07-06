import React, { Component } from 'react';

import { PageLoading } from 'Core/ant';
import userManager from 'Core/authorization/utils/userManager';

// import { logout } from '../../action-creators';

class CallbackPage extends Component {
    componentDidMount() {
        userManager
            .signinRedirectCallback()
            .then((user) => this.successCallback(user))
            .catch((error) => this.errorCallback(error));
    }

    successCallback = (user) => {
        window.location = user.state.path;
    };

    errorCallback = () => {
        window.location = '/';
    };

    render() {
        return (
            <PageLoading />
        );
    }
}

export default CallbackPage;
