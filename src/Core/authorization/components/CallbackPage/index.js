import React, { Component } from 'react';

import Loader from 'Core/common/Loader';
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
        console.log('-----------SUCCESS-----------');
        window.location = user.state.path;
    };

    errorCallback = () => {
        console.log('-----------ERROR-----------');
        window.location = '/';
    };

    render() {
        return (
            <Loader />
        );
    }
}

export default CallbackPage;
