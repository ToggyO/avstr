import { call } from 'redux-saga/effects';
import api from 'Core/api';
import handleRequestAdvertisements from './handleRequestAdvertisements';

const { REACT_APP_ADVERTISER_API } = process.env;


function* handleDeleteAdvertisement({ data }) {
    try {
        yield call(api.delete, `${REACT_APP_ADVERTISER_API}/advertiser-microservice/admin/promotions/${data}`);
        yield* handleRequestAdvertisements();
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                window.location = '/';
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                break;
            default:
                break;
        }
    }
}

export default handleDeleteAdvertisement;
