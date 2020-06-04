import { useEffect } from 'react';

import { ERROR_CODES } from '../constants';
import { transformErrorToForm } from './common';

/**
 * Функция пробрасывает обработанные ошибки с API в инстанс формы
 * @return {Array<object>} errorsFromBackend - массив ошибок с API
 * @return {object} formInstance - инстанс формы
 * @return {void}
 */
export const useBackendErrors = (errorsFromBackend = [], formInstance = {}) => {
    useEffect(() => {
        if (errorsFromBackend.length && formInstance) {
            const transformedErrors = transformErrorToForm(errorsFromBackend, ERROR_CODES, formInstance);
            formInstance.setFields(transformedErrors);
        }
    }, [errorsFromBackend, formInstance]);
};
