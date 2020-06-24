import React, { Component } from 'react';

import { PageLoading } from 'Core/ant';
import { processSilentRenew } from 'redux-oidc';

class SilentRenewPage extends Component {
    componentDidMount() {
        processSilentRenew();
    }

    render() {
        return (
            <PageLoading />
        );
    }
}

export default SilentRenewPage;
