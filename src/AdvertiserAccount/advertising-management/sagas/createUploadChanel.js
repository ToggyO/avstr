import { END, eventChannel } from 'redux-saga';
import handleRequestErrors from 'Core/api/handeRequestErrors';

function createUploadChanel(xhr, file) {
    return eventChannel((emitter) => {
        const onProgress = ({ lengthComputable, loaded, total }) => {
            if (lengthComputable) {
                const progress = `${loaded} / ${total}`;
                emitter({ progress });
            }
        };

        const onFailure = () => {
            emitter({ err: true });
            emitter(END);
        };

        const onAbort = () => {
            emitter({ abort: true });
            emitter(END);
        };

        const onSuccess = () => {
            try {
                const { status, response } = xhr;
                if (status === 201) {
                    emitter({ success: { response } });
                    emitter(END);
                } else {
                    handleRequestErrors(status);
                }
            } catch ({ type }) {
                switch (type) {
                    case 'AuthorizationError':
                        window.location = '/';
                        break;
                    case 'ServerError':
                        alert('На сервере произошла ошибка');
                        break;
                    default:
                        break;
                }
            }
        };

        xhr.upload.addEventListener('progress', onProgress);
        xhr.upload.addEventListener('error', onFailure);
        xhr.upload.addEventListener('abort', onAbort);
        xhr.addEventListener('loadend', onSuccess);

        xhr.send(file);

        return () => {
            xhr.upload.removeEventListener('progress', onProgress);
            xhr.upload.removeEventListener('error', onFailure);
            xhr.upload.removeEventListener('abort', onFailure);
            xhr.removeEventListener('loadend', onSuccess);
            xhr.abort();
        };
    });
}

export default createUploadChanel;
