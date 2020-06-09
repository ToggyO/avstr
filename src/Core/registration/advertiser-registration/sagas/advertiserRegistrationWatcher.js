import { takeLatest } from 'redux-saga/effects';
import { REGISTER_ADVERTISER, CONFIRM_ADVERTISER_REGISTRATION } from '../actions';

import handleRegisterAdvertiser from './handleRegisterAdvertiser';
import confirmAdvertiserRegistration from './handleConfirmAdvertiserRegistration';

export default function* authorizationWatcher() {
    yield takeLatest(REGISTER_ADVERTISER, handleRegisterAdvertiser);
    yield takeLatest(CONFIRM_ADVERTISER_REGISTRATION, confirmAdvertiserRegistration);
}
