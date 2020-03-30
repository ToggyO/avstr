import React, { Component } from 'react';

import Loader from 'Core/common/Loader';
import { processSilentRenew } from 'redux-oidc';

class SilentRenewPage extends Component {
    componentDidMount() {
        processSilentRenew();
    }

    render() {
        return (
            <Loader />
        );
    }
}

export default SilentRenewPage;
