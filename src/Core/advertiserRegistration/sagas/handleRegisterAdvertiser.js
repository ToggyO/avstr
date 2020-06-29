import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
// import history from 'Core/history';
import API_URLS_ADV_REGISTRATION from '../constants/api-urls';
import * as actions from '../actions';

const { REACT_APP_AUTH_API } = process.env;


function* handleRegisterAdvertiser({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.REGISTER}`, data, {
            credentials: 'include',
        });
        yield put({ type: actions.REGISTER_ADVERTISER_SUCCESS });
    } catch (error) {
        const { errorContent } = error;
        yield put({ type: actions.REGISTER_ADVERTISER_ERROR, data: errorContent });
        // const { type, content } = err;
        // switch (type) {
        //     case 'BadRequest':
        //         if (content && content[0] === 'DuplicateUserName') {
        //             yield put({
        //                 type: actions.REGISTER_ADVERTISER_ERROR,
        //                 data: 'Рекламодатель с такой почтой уже существует',
        //             });
        //         } else {
        //             yield put({
        //                 type: actions.REGISTER_ADVERTISER_ERROR,
        //                 data: 'BadRequest',
        //             });
        //         }
        //         break;
        //     case 'AuthorizationError':
        //         alert('Ошибка авторизации.');
        //         history.push('/');
        //         break;
        //     case 'ServerError':
        //         alert('На сервере произошла ошибка.');
        //         history.push('/');
        //         break;
        //     default:
        //         yield put({
        //             type: actions.REGISTER_ADVERTISER_ERROR,
        //             data: 'Default Error',
        //         });
        // }
    }
}

export default handleRegisterAdvertiser;
