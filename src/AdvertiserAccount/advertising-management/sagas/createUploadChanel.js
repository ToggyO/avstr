import { END, eventChannel } from 'redux-saga';

function createUploadChanel(xhr, file) {
    return eventChannel((emitter) => {
        const onProgress = ({ lengthComputable, loaded, total }) => {
            if (lengthComputable) {
                const progress = `${loaded} / ${total}`;
                emitter({ progress });
            }
        };

        const onFailure = (statusCode, error = {}) => {
            const resultError = error === null ? {} : error;
            emitter({ isErr: true, status: statusCode, error: resultError });
            emitter(END);
        };

        const onAbort = () => {
            emitter({ abort: true });
            emitter(END);
        };

        const onSuccess = () => {
            const { status, response = {} } = xhr;
            if (status === 201) {
                emitter({ success: { response } });
                emitter(END);
            } else {
                onFailure(status, response);
            }
        };

        xhr.upload.addEventListener('progress', onProgress);
        xhr.upload.addEventListener('error', () => {
            const { status, response = {} } = xhr;
            return onFailure(status, response);
        });
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
