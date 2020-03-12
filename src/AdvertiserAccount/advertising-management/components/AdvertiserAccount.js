import React from 'react';
import userManager from '../../../Core/authorization/userManager';
// import PropTypes from 'prop-types';

const AdvertiserAccount = () => (
    <div>
        <h1>
            Advertiser Account
        </h1>
        <button
            type="button"
            onClick={() => {
                userManager.getUser().then((user) => alert(user.access_token));
            }}
        >
            getuser
        </button>
    </div>
);


AdvertiserAccount.defaultProps = {};

AdvertiserAccount.propTypes = {};

export default AdvertiserAccount;
