import { put, call } from 'redux-saga/effects';
import api from 'Core/api';
import handleRequestErrors from 'Core/api/handeRequestErrors';
import { changeUploadStatus } from '../action-creators';

const { REACT_APP_API } = process.env;


function* handleUploadFile({ data: { advertisementText, file } }) {
    yield put(changeUploadStatus('pending'));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', advertisementText);

    const req = yield call(api.configurePostFile, `${REACT_APP_API}/advertiser-microservice/advertisements`, 'json');

    try {
        req.upload.onprogress = ({ loaded, total }) => {
            console.log(`Отправлено ${loaded} из ${total}`);
        };

        req.onloadend = () => {
            const { status } = req;
            if (status === 201) {
                console.log('Отправлено успешно!');
            } else {
                console.log('Ошибка при отправке');
            }
        };
        req.send(formData);
    } catch (err) {
        handleRequestErrors(req.status);
    }
}

export default handleUploadFile;
