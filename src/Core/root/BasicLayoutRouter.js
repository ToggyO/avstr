import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';

import { ROOT_ROUTES, USER_ROLES } from 'Core/constants';
import AuthRoute from '../routeManagement/AuthRoute';
import BasicLayout from '../ant/components/Layouts/BasicLayout';

const TokenPage = lazy(() => import('../authorization/components/TokenPage'));
const AdvertisingManagementRouter = lazy(() => import('AdvertiserAccount/advertising-management/AdvertisingManagementRouter'));
const DevicesRouter = lazy(() => import('DevicesAccount/DevicesRouter'));
const AdvertiserPage = lazy(() => import('AdvertiserAccount/advertiser/AdvertiserPage'));

const BasicLayoutRouter = () => (
    <BasicLayout>
        <Switch>
            <AuthRoute
                path={ROOT_ROUTES.AD_MANAGER}
                allowedRoles={[USER_ROLES.ADMINISTRATOR, USER_ROLES.AD_MANAGER]}
                component={AdvertisingManagementRouter}
            />

            <AuthRoute
                path={ROOT_ROUTES.DEVICES}
                allowedRoles={[USER_ROLES.ADMINISTRATOR, USER_ROLES.DEVICE_MANAGER]}
                component={DevicesRouter}
            />
            <AuthRoute
                path={ROOT_ROUTES.ADVERTISER}
                allowedRoles={[USER_ROLES.ADVERTISER]}
                component={AdvertiserPage}
            />

            <AuthRoute
                path={ROOT_ROUTES.TOKEN}
                allowedRoles={[]}
                component={TokenPage}
            />
        </Switch>
    </BasicLayout>
);

export default BasicLayoutRouter;
