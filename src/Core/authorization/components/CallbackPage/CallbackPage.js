import React, { Component } from 'react';
import userManager from '../../userManager';
// import history from '../../../history';

class CallbackPage extends Component {
    componentDidMount() {
        // alert('callbackpage');
        userManager
            .signinRedirectCallback()
            .then((user) => this.successCallback(user))
            .catch((error) => this.errorCallback(error));
    }

    /* errorCallback = (error) => {
        alert(error);
        console.log(error);
        history.push('/');
    };

    successCallback = ({ state: { path: { path } } }) => {
        alert('success', path);
        history.push('/advertiser');
    }; */

    render() {
        return <div>Loading...</div>;
    }
}

export default CallbackPage;
